const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

dotenv.config();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const db = admin.firestore();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// CORS for all routes
app.use(cors());

// Webhook route MUST come before express.json() — needs raw body for signature verification
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
        const uid = session.metadata?.uid;
        const newPlan = session.metadata?.newPlan;

        if (uid) {
          // Update customer plan
          await db.collection('customers').doc(uid).update({
            currentPlan: newPlan,
            lastPayment: new Date().toISOString(),
            stripeCustomerId: session.customer || null,
          });

          // Store the transaction
          await db.collection('customers').doc(uid).collection('transactions').add({
            type: 'checkout',
            stripeSessionId: session.id,
            stripeCustomerId: session.customer || null,
            stripePaymentIntentId: session.payment_intent || null,
            amount: session.amount_total, // in cents
            currency: session.currency || 'usd',
            status: session.payment_status, // 'paid', 'unpaid', 'no_payment_required'
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
          // Look up customer in Firestore by stripeCustomerId
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

      // Subscription invoice paid (recurring billing)
      case 'invoice.paid': {
        const invoice = event.data.object;
        const invoiceCustomerId = invoice.customer;

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
            const action = event.type.split('.').pop(); // 'created', 'updated', 'deleted'

            await customerDoc.ref.update({
              subscriptionStatus: subscription.status, // 'active', 'canceled', 'past_due', etc.
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

// Create Stripe Checkout Session with Price Mapping
app.post('/api/create-checkout-session', async (req, res) => {
  const { uid, newPlan, email } = req.body;

  const priceMap = {
    'Standard Website': 'price_12345',
    'E-Commerce Website': 'price_67890',
    '$5,000 Premium Build': 'price_abcde',
    '$8,500 Agency Replacement': 'price_fghij',
    '$10,000 Enterprise Platform': 'price_klmno',
    'Email Setup': 'price_11111',
    'Maintenance Plan': 'price_22222',
    'Form Generator': 'price_33333',
    'Accounting Module': 'price_44444',
    'Customer Dashboard': 'price_55555',
    'PDF Generator': 'price_66666',
    'SEO Boost': 'price_77777',
    'Dynamic Quote Builder': 'price_88888',
    'Staff Role Controls': 'price_99999',
    'Job Ticketing System': 'price_101010',
    'File Upload & Signing': 'price_111213',
    'Multi-Location Support': 'price_121314',
    'Customer Rewards Tracker': 'price_131415',
    'System Connector': 'price_141516',
    'Analytics Dashboard': 'price_151617',
    'Onboarding Wizard': 'price_161718'
  };

  const priceId = priceMap[newPlan];
  if (!priceId) {
    return res.status(400).json({ error: 'Invalid plan selected.' });
  }

  try {
    // Find or create a Stripe customer so transactions link together
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
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'https://customer.stephenscode.dev/upgrade-success',
      cancel_url: 'https://customer.stephenscode.dev/upgrade-cancel',
      metadata: { uid, newPlan },
    };

    // Attach Stripe customer if we have one
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
    // Try Firestore first
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

    // Fallback: Pull directly from Stripe API
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

    // Pull charges from Stripe
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

    // Get all successful transactions
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
      totalSpent: totalSpent, // in cents
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

// Start the server
app.listen(3000, () => console.log('Backend server running on port 3000'));
