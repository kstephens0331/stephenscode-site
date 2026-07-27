const path = require('path');
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const { TIERS, PLAN_TYPES, getTier, getStripeProductId } = require('./lib/pricing-catalog');

dotenv.config();

// Initialize Firebase Admin -- two separate projects, matching admin-dashboard's existing
// multi-project setup (admin-dashboard/src/auth/firebase.js): "customers" project holds
// customer accounts/transactions, "orders" project holds the shared orders collection that
// admin-dashboard's Orders.jsx and AddOrder.jsx already read/write. Writing new checkout
// orders into the wrong project would make them invisible to the existing admin UI.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const db = admin.firestore();

const ordersServiceAccountPath = process.env.ORDERS_SERVICE_ACCOUNT_PATH || './service-account-orders.json';
const ordersApp = admin.apps.find((a) => a.name === 'orders') || admin.initializeApp({
  credential: admin.credential.cert(require(path.resolve(ordersServiceAccountPath))),
}, 'orders');
const ordersDb = ordersApp.firestore();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// CORS: allowlist real StephensCode origins only, not every origin on the internet.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://www.stephenscode.dev,https://stephenscode.dev,https://customer.stephenscode.dev')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Allow non-browser requests (curl, server-to-server health checks) with no Origin header.
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
}));

function requireAdminSecret(req, res, next) {
  const provided = req.headers['x-admin-secret'];
  if (!process.env.ADMIN_API_SECRET || provided !== process.env.ADMIN_API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  next();
}

function computeInstallmentPreview(priceUsd, months) {
  const baseCents = Math.round(priceUsd * 100);
  const downPaymentCents = Math.round(baseCents * 0.2);
  const remainingCents = baseCents - downPaymentCents;
  const monthlyCents = Math.floor(remainingCents / months);
  const firstMonthCents = monthlyCents + (remainingCents - monthlyCents * months);
  return {
    downPaymentUsd: downPaymentCents / 100,
    firstMonthUsd: firstMonthCents / 100,
    monthlyUsd: monthlyCents / 100,
    months,
  };
}

// Webhook route MUST come before express.json() -- needs raw body for signature verification
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      // One-time payment completed via Checkout
      case 'checkout.session.completed': {
        const session = event.data.object;
        const meta = session.metadata || {};

        if (meta.source === 'marketing-checkout') {
          const orderId = session.id;
          const email = session.customer_details?.email || session.customer_email || null;
          const tier = getTier(meta.tierSlug);
          const tierPriceUsd = tier ? tier.priceUsd : session.amount_total / 100;

          // Matches the existing order schema admin-dashboard/src/pages/AddOrder.jsx already
          // writes and Orders.jsx already reads (dollars, not cents; items array; source field) --
          // this collection lives in the SAME "orders" project as the rest of the admin UI, not
          // the "customers" project, so new checkout orders show up in the existing Orders page
          // with zero changes needed there beyond the new status badge.
          const base = {
            email,
            customerId: meta.uid || null,
            customerName: session.customer_details?.name || email,
            items: [{ title: tier ? tier.name : meta.tierSlug, price: tierPriceUsd, quantity: 1 }],
            total: tierPriceUsd,
            source: 'marketing-checkout',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            linkedAccount: !!meta.uid,
            tierSlug: meta.tierSlug,
            planType: meta.planType,
            stripeCustomerId: session.customer || null,
            stripeSessionId: session.id,
            amountPaidCents: session.amount_total,
            currency: session.currency || 'usd',
          };

          if (meta.planType === 'full') {
            await ordersDb.collection('orders').doc(orderId).set({
              ...base,
              status: 'paid_in_full',
              totalCents: session.amount_total,
            });
          } else if (meta.planType === 'deposit50') {
            const remainderCents = parseInt(meta.remainderCents, 10) || 0;
            await ordersDb.collection('orders').doc(orderId).set({
              ...base,
              status: 'deposit_paid',
              remainderCents,
              totalCents: session.amount_total + remainderCents,
            });
          } else if (meta.planType === 'installment6' || meta.planType === 'installment12') {
            const months = parseInt(meta.installmentMonths, 10);
            const monthlyCents = parseInt(meta.installmentMonthlyCents, 10);
            const firstAdjustmentCents = parseInt(meta.installmentLastAdjustmentCents, 10) || 0;
            const productId = meta.productId;

            let subscriptionId = null;
            try {
              const phases = [
                {
                  items: [{
                    price_data: {
                      currency: 'usd',
                      product: productId,
                      unit_amount: monthlyCents + firstAdjustmentCents,
                      recurring: { interval: 'month' },
                    },
                    quantity: 1,
                  }],
                  iterations: 1,
                },
              ];
              if (months > 1) {
                phases.push({
                  items: [{
                    price_data: {
                      currency: 'usd',
                      product: productId,
                      unit_amount: monthlyCents,
                      recurring: { interval: 'month' },
                    },
                    quantity: 1,
                  }],
                  iterations: months - 1,
                });
              }

              const schedule = await stripe.subscriptionSchedules.create({
                customer: session.customer,
                start_date: 'now',
                end_behavior: 'cancel',
                phases,
              });
              subscriptionId = schedule.subscription || null;
            } catch (scheduleErr) {
              console.error('Failed to create installment subscription schedule:', scheduleErr);
            }

            await ordersDb.collection('orders').doc(orderId).set({
              ...base,
              status: subscriptionId ? 'downpayment_paid' : 'downpayment_paid_schedule_failed',
              subscriptionId,
              installmentMonths: months,
              installmentMonthlyCents: monthlyCents,
              totalCents: session.amount_total + monthlyCents * (months - 1) + (monthlyCents + firstAdjustmentCents),
            });
          }

          console.log(`Marketing checkout order stored: ${orderId} (${meta.tierSlug}, ${meta.planType})`);
          break;
        }

        // Existing customer-portal upgrade flow (UpgradePlan.jsx)
        const uid = meta.uid;
        const newPlan = meta.newPlan;

        if (uid) {
          await db.collection('customers').doc(uid).update({
            currentPlan: newPlan,
            lastPayment: new Date().toISOString(),
            stripeCustomerId: session.customer || null,
          });

          await db.collection('customers').doc(uid).collection('transactions').add({
            type: 'checkout',
            stripeSessionId: session.id,
            stripeCustomerId: session.customer || null,
            stripePaymentIntentId: session.payment_intent || null,
            amount: session.amount_total,
            currency: session.currency || 'usd',
            status: session.payment_status,
            plan: newPlan,
            customerEmail: session.customer_details?.email || session.customer_email || null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            stripeCreatedAt: new Date(session.created * 1000).toISOString(),
          });

          console.log(`Transaction stored for customer ${uid}: ${newPlan} - $${(session.amount_total / 100).toFixed(2)}`);
        }
        break;
      }

      // Successful charge (catches payments from all sources)
      case 'charge.succeeded': {
        const charge = event.data.object;
        const customerId = charge.customer;

        if (customerId) {
          const customerSnap = await db.collection('customers')
            .where('stripeCustomerId', '==', customerId)
            .limit(1)
            .get();

          if (!customerSnap.empty) {
            const customerDoc = customerSnap.docs[0];
            await customerDoc.ref.collection('transactions').add({
              type: 'charge',
              stripeChargeId: charge.id,
              stripeCustomerId: customerId,
              stripePaymentIntentId: charge.payment_intent || null,
              amount: charge.amount,
              currency: charge.currency,
              status: 'succeeded',
              description: charge.description || null,
              receiptUrl: charge.receipt_url || null,
              customerEmail: charge.billing_details?.email || charge.receipt_email || null,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              stripeCreatedAt: new Date(charge.created * 1000).toISOString(),
            });
          }
        }
        break;
      }

      // Refund issued
      case 'charge.refunded': {
        const refundedCharge = event.data.object;
        const refundCustomerId = refundedCharge.customer;

        if (refundCustomerId) {
          const customerSnap = await db.collection('customers')
            .where('stripeCustomerId', '==', refundCustomerId)
            .limit(1)
            .get();

          if (!customerSnap.empty) {
            const customerDoc = customerSnap.docs[0];
            await customerDoc.ref.collection('transactions').add({
              type: 'refund',
              stripeChargeId: refundedCharge.id,
              stripeCustomerId: refundCustomerId,
              amount: refundedCharge.amount_refunded,
              currency: refundedCharge.currency,
              status: 'refunded',
              description: `Refund for charge ${refundedCharge.id}`,
              customerEmail: refundedCharge.billing_details?.email || null,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              stripeCreatedAt: new Date(refundedCharge.created * 1000).toISOString(),
            });
          }
        }
        break;
      }

      // Subscription invoice paid (recurring billing -- also drives installment-plan progress)
      case 'invoice.paid': {
        const invoice = event.data.object;
        const invoiceCustomerId = invoice.customer;

        if (invoice.subscription) {
          const orderSnap = await ordersDb.collection('orders')
            .where('subscriptionId', '==', invoice.subscription)
            .limit(1)
            .get();

          if (!orderSnap.empty) {
            const orderDoc = orderSnap.docs[0];
            await orderDoc.ref.collection('installmentPayments').add({
              stripeInvoiceId: invoice.id,
              amountPaidCents: invoice.amount_paid,
              status: 'paid',
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              stripeCreatedAt: new Date(invoice.created * 1000).toISOString(),
            });
          }
        }

        // A manually-sent remainder invoice for a deposit50 order being paid
        const remainderOrderSnap = await ordersDb.collection('orders')
          .where('remainderInvoiceId', '==', invoice.id)
          .limit(1)
          .get();
        if (!remainderOrderSnap.empty) {
          await remainderOrderSnap.docs[0].ref.update({ status: 'paid_in_full' });
        }

        if (invoiceCustomerId) {
          const customerSnap = await db.collection('customers')
            .where('stripeCustomerId', '==', invoiceCustomerId)
            .limit(1)
            .get();

          if (!customerSnap.empty) {
            const customerDoc = customerSnap.docs[0];
            await customerDoc.ref.collection('transactions').add({
              type: 'invoice',
              stripeInvoiceId: invoice.id,
              stripeCustomerId: invoiceCustomerId,
              stripeSubscriptionId: invoice.subscription || null,
              amount: invoice.amount_paid,
              currency: invoice.currency,
              status: 'paid',
              description: invoice.lines?.data?.[0]?.description || 'Invoice payment',
              invoicePdf: invoice.invoice_pdf || null,
              hostedInvoiceUrl: invoice.hosted_invoice_url || null,
              customerEmail: invoice.customer_email || null,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              stripeCreatedAt: new Date(invoice.created * 1000).toISOString(),
            });
          }
        }
        break;
      }

      // Invoice payment failed
      case 'invoice.payment_failed': {
        const failedInvoice = event.data.object;
        const failedCustomerId = failedInvoice.customer;

        if (failedInvoice.subscription) {
          const orderSnap = await ordersDb.collection('orders')
            .where('subscriptionId', '==', failedInvoice.subscription)
            .limit(1)
            .get();
          if (!orderSnap.empty) {
            await orderSnap.docs[0].ref.update({ status: 'installment_payment_failed' });
            await orderSnap.docs[0].ref.collection('installmentPayments').add({
              stripeInvoiceId: failedInvoice.id,
              amountDueCents: failedInvoice.amount_due,
              status: 'failed',
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              stripeCreatedAt: new Date(failedInvoice.created * 1000).toISOString(),
            });
          }
        }

        if (failedCustomerId) {
          const customerSnap = await db.collection('customers')
            .where('stripeCustomerId', '==', failedCustomerId)
            .limit(1)
            .get();

          if (!customerSnap.empty) {
            const customerDoc = customerSnap.docs[0];
            await customerDoc.ref.collection('transactions').add({
              type: 'invoice_failed',
              stripeInvoiceId: failedInvoice.id,
              stripeCustomerId: failedCustomerId,
              amount: failedInvoice.amount_due,
              currency: failedInvoice.currency,
              status: 'failed',
              description: 'Payment failed',
              customerEmail: failedInvoice.customer_email || null,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              stripeCreatedAt: new Date(failedInvoice.created * 1000).toISOString(),
            });
          }
        }
        break;
      }

      // Subscription lifecycle events
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const subCustomerId = subscription.customer;

        if (subCustomerId) {
          const customerSnap = await db.collection('customers')
            .where('stripeCustomerId', '==', subCustomerId)
            .limit(1)
            .get();

          if (!customerSnap.empty) {
            const customerDoc = customerSnap.docs[0];
            const action = event.type.split('.').pop();

            await customerDoc.ref.update({
              subscriptionStatus: subscription.status,
              subscriptionId: subscription.id,
            });

            await customerDoc.ref.collection('transactions').add({
              type: 'subscription',
              action,
              stripeSubscriptionId: subscription.id,
              stripeCustomerId: subCustomerId,
              status: subscription.status,
              description: `Subscription ${action}`,
              currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              stripeCreatedAt: new Date(subscription.created * 1000).toISOString(),
            });
          }
        }

        // Mark an installment order complete once its schedule-driven subscription ends normally.
        if (event.type === 'customer.subscription.deleted') {
          const orderSnap = await ordersDb.collection('orders')
            .where('subscriptionId', '==', subscription.id)
            .limit(1)
            .get();
          if (!orderSnap.empty && subscription.status === 'canceled') {
            await orderSnap.docs[0].ref.update({ status: 'paid_in_full' });
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error(`Error processing ${event.type}:`, err);
    // Still return 200 so Stripe doesn't retry
  }

  res.json({ received: true });
});

// JSON parsing for all other routes (AFTER webhook route)
app.use(express.json());

// Real catalog + pricing preview for the 7 self-serve checkout tiers
app.get('/api/checkout/tiers', (req, res) => {
  const tiers = TIERS.map((t) => ({
    slug: t.slug,
    name: t.name,
    priceUsd: t.priceUsd,
    plans: {
      full: { totalUsd: t.priceUsd },
      deposit50: { depositUsd: t.priceUsd / 2, remainderUsd: t.priceUsd / 2 },
      installment6: computeInstallmentPreview(t.priceUsd, 6),
      installment12: computeInstallmentPreview(t.priceUsd, 12),
    },
  }));
  res.json({ tiers });
});

// Create a real self-serve checkout session for one of the 7 tiers, in one of 4 payment plans:
// full, deposit50 (50% now / 50% invoiced on completion), installment6 or installment12
// (20% down now, remainder split evenly over 6 or 12 monthly charges via a Subscription Schedule).
app.post('/api/checkout/session', async (req, res) => {
  const { tierSlug, planType, email, uid } = req.body;

  const tier = getTier(tierSlug);
  if (!tier) {
    return res.status(400).json({ error: 'Invalid tier selected.' });
  }
  if (!PLAN_TYPES.includes(planType)) {
    return res.status(400).json({ error: 'Invalid payment plan selected.' });
  }
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const productId = getStripeProductId(tierSlug);
  if (!productId) {
    return res.status(500).json({
      error: 'Checkout catalog is not initialized. Run scripts/create-stripe-catalog.js once with a real STRIPE_SECRET_KEY set.',
    });
  }

  const successUrl = process.env.CHECKOUT_SUCCESS_URL || 'https://www.stephenscode.dev/checkout/success';
  const cancelUrl = process.env.CHECKOUT_CANCEL_URL || 'https://www.stephenscode.dev/pricing';
  const baseCents = Math.round(tier.priceUsd * 100);

  try {
    const sessionParams = {
      mode: 'payment',
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      customer_email: email,
    };

    if (planType === 'full') {
      sessionParams.line_items = [{
        price_data: { currency: 'usd', product: productId, unit_amount: baseCents },
        quantity: 1,
      }];
      sessionParams.metadata = { source: 'marketing-checkout', tierSlug, planType, uid: uid || '' };
    } else if (planType === 'deposit50') {
      const depositCents = Math.round(baseCents / 2);
      sessionParams.line_items = [{
        price_data: { currency: 'usd', product: productId, unit_amount: depositCents },
        quantity: 1,
      }];
      sessionParams.metadata = {
        source: 'marketing-checkout', tierSlug, planType, uid: uid || '',
        remainderCents: String(baseCents - depositCents),
      };
    } else {
      const months = planType === 'installment6' ? 6 : 12;
      const downPaymentCents = Math.round(baseCents * 0.2);
      const remainingCents = baseCents - downPaymentCents;
      const monthlyCents = Math.floor(remainingCents / months);
      const lastAdjustmentCents = remainingCents - monthlyCents * months;

      sessionParams.line_items = [{
        price_data: { currency: 'usd', product: productId, unit_amount: downPaymentCents },
        quantity: 1,
      }];
      sessionParams.metadata = {
        source: 'marketing-checkout', tierSlug, planType, uid: uid || '', productId,
        installmentMonths: String(months),
        installmentMonthlyCents: String(monthlyCents),
        installmentLastAdjustmentCents: String(lastAdjustmentCents),
      };
      // Force a real Stripe Customer object so the webhook can attach a Subscription Schedule to it.
      sessionParams.customer_creation = 'always';
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout session error:', err);
    res.status(500).json({ error: 'Failed to create checkout session.' });
  }
});

// Admin-only: invoice the remaining 50% for a deposit50 order once the project is complete.
app.post('/api/checkout/collect-remainder', requireAdminSecret, async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res.status(400).json({ error: 'orderId is required.' });
  }

  try {
    const orderDoc = await ordersDb.collection('orders').doc(orderId).get();
    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    const order = orderDoc.data();
    if (order.status !== 'deposit_paid') {
      return res.status(400).json({ error: `Order status is '${order.status}', expected 'deposit_paid'.` });
    }
    if (!order.stripeCustomerId) {
      return res.status(400).json({ error: 'Order has no Stripe customer to invoice.' });
    }

    await stripe.invoiceItems.create({
      customer: order.stripeCustomerId,
      amount: order.remainderCents,
      currency: 'usd',
      description: `${order.tierSlug} -- remaining balance`,
    });

    const invoice = await stripe.invoices.create({
      customer: order.stripeCustomerId,
      collection_method: 'send_invoice',
      days_until_due: 7,
      auto_advance: true,
    });
    await stripe.invoices.finalizeInvoice(invoice.id);
    await stripe.invoices.sendInvoice(invoice.id);

    await orderDoc.ref.update({ status: 'remainder_invoiced', remainderInvoiceId: invoice.id });
    res.json({ success: true, invoiceId: invoice.id, hostedInvoiceUrl: invoice.hosted_invoice_url });
  } catch (err) {
    console.error('Collect-remainder error:', err);
    res.status(500).json({ error: 'Failed to invoice remainder.' });
  }
});

// Customer-facing: the authenticated customer's own real orders and payment status, from the
// shared orders project. Goes through a verified Firebase ID token rather than a direct client
// Firestore read, so the customer portal doesn't need its own identity in the orders project's
// Auth (that gap is exactly why Firestore rules there have been wide open).
app.get('/api/customer/orders', async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const idToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!idToken) {
    return res.status(401).json({ error: 'Missing bearer token.' });
  }

  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }

  try {
    const byUidSnap = await ordersDb.collection('orders').where('customerId', '==', decoded.uid).get();
    const seenIds = new Set(byUidSnap.docs.map((d) => d.id));

    let byEmailDocs = [];
    if (decoded.email) {
      const byEmailSnap = await ordersDb.collection('orders').where('email', '==', decoded.email).get();
      byEmailDocs = byEmailSnap.docs.filter((d) => !seenIds.has(d.id));
    }

    const orders = await Promise.all([...byUidSnap.docs, ...byEmailDocs].map(async (doc) => {
      const data = doc.data();
      let hostedInvoiceUrl = null;
      if (data.remainderInvoiceId) {
        try {
          const invoice = await stripe.invoices.retrieve(data.remainderInvoiceId);
          hostedInvoiceUrl = invoice.hosted_invoice_url || null;
        } catch (err) {
          console.error(`Could not retrieve invoice ${data.remainderInvoiceId}:`, err.message);
        }
      }

      return {
        id: doc.id,
        tierSlug: data.tierSlug || null,
        planType: data.planType || null,
        status: data.status || null,
        totalUsd: data.total ?? null,
        amountPaidCents: data.amountPaidCents ?? null,
        remainderCents: data.remainderCents ?? null,
        installmentMonths: data.installmentMonths ?? null,
        installmentMonthlyCents: data.installmentMonthlyCents ?? null,
        hostedInvoiceUrl,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
      };
    }));

    orders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ orders });
  } catch (err) {
    console.error('Error fetching customer orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

// Legacy customer-portal upgrade endpoint (UpgradePlan.jsx). Kept working, now backed by the
// same real tier catalog instead of placeholder Stripe Price IDs -- but this path only ever
// supports a single full-amount charge (it predates the multi-plan-type checkout above).
app.post('/api/create-checkout-session', async (req, res) => {
  const { uid, newPlan, email } = req.body;

  const legacyPlanToSlug = {
    'Standard Website': 'standard-website',
    'E-Commerce Website': 'ecommerce-website',
    'Premium Build': 'premium-build',
    'Custom Business Platform': 'custom-business-platform',
    'Enterprise Platform': 'enterprise-platform',
  };

  const slug = legacyPlanToSlug[newPlan];
  const tier = slug && getTier(slug);
  const productId = slug && getStripeProductId(slug);

  if (!tier || !productId) {
    return res.status(400).json({ error: 'Invalid or unsupported plan selected.' });
  }

  try {
    let stripeCustomerId = null;
    if (uid) {
      const customerDoc = await db.collection('customers').doc(uid).get();
      stripeCustomerId = customerDoc.data()?.stripeCustomerId;

      if (!stripeCustomerId && email) {
        const stripeCustomer = await stripe.customers.create({
          email,
          metadata: { firebaseUid: uid },
        });
        stripeCustomerId = stripeCustomer.id;
        await db.collection('customers').doc(uid).update({
          stripeCustomerId: stripeCustomer.id,
        });
      }
    }

    const sessionParams = {
      mode: 'payment',
      line_items: [{
        price_data: { currency: 'usd', product: productId, unit_amount: Math.round(tier.priceUsd * 100) },
        quantity: 1,
      }],
      success_url: 'https://customer.stephenscode.dev/upgrade-success',
      cancel_url: 'https://customer.stephenscode.dev/upgrade-cancel',
      metadata: { uid, newPlan },
    };

    if (stripeCustomerId) {
      sessionParams.customer = stripeCustomerId;
    } else if (email) {
      sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout session error:', err);
    res.status(500).json({ error: 'Failed to create checkout session.' });
  }
});

// Get transaction history for a customer (Firestore first, Stripe fallback)
app.get('/api/transactions/:uid', async (req, res) => {
  const { uid } = req.params;
  const { limit = 50, source = 'auto' } = req.query;

  try {
    if (source !== 'stripe') {
      const transactionsSnap = await db.collection('customers').doc(uid)
        .collection('transactions')
        .orderBy('createdAt', 'desc')
        .limit(parseInt(limit))
        .get();

      if (!transactionsSnap.empty) {
        const transactions = transactionsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        }));

        return res.json({
          source: 'firestore',
          count: transactions.length,
          transactions,
        });
      }
    }

    const customerDoc = await db.collection('customers').doc(uid).get();
    const stripeCustomerId = customerDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
      return res.json({
        source: 'none',
        count: 0,
        transactions: [],
        message: 'No Stripe customer linked to this account.',
      });
    }

    const charges = await stripe.charges.list({
      customer: stripeCustomerId,
      limit: parseInt(limit),
    });

    const transactions = charges.data.map(charge => ({
      id: charge.id,
      type: charge.refunded ? 'refund' : 'charge',
      stripeChargeId: charge.id,
      stripeCustomerId: charge.customer,
      amount: charge.amount,
      currency: charge.currency,
      status: charge.status,
      description: charge.description,
      receiptUrl: charge.receipt_url,
      customerEmail: charge.billing_details?.email || charge.receipt_email,
      stripeCreatedAt: new Date(charge.created * 1000).toISOString(),
    }));

    res.json({
      source: 'stripe',
      count: transactions.length,
      transactions,
    });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Failed to fetch transaction history.' });
  }
});

// Get a summary of a customer's billing (total spent, last payment, etc.)
app.get('/api/billing-summary/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const customerDoc = await db.collection('customers').doc(uid).get();
    if (!customerDoc.exists) {
      return res.status(404).json({ error: 'Customer not found.' });
    }

    const customerData = customerDoc.data();

    const transactionsSnap = await db.collection('customers').doc(uid)
      .collection('transactions')
      .where('status', 'in', ['succeeded', 'paid'])
      .orderBy('createdAt', 'desc')
      .get();

    const transactions = transactionsSnap.docs.map(doc => doc.data());
    const totalSpent = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);

    res.json({
      currentPlan: customerData.currentPlan || null,
      subscriptionStatus: customerData.subscriptionStatus || null,
      stripeCustomerId: customerData.stripeCustomerId || null,
      totalSpent: totalSpent,
      totalSpentFormatted: `$${(totalSpent / 100).toFixed(2)}`,
      transactionCount: transactions.length,
      lastPayment: transactions[0]?.stripeCreatedAt || customerData.lastPayment || null,
    });
  } catch (err) {
    console.error('Error fetching billing summary:', err);
    res.status(500).json({ error: 'Failed to fetch billing summary.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
