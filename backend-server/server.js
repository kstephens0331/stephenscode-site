const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const db = admin.firestore();

// ✅ Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// ✅ Use JSON for normal API requests
app.use(express.json());
app.use(cors());

// ✅ Create Stripe Checkout Session with Price Mapping
app.post('/api/create-checkout-session', async (req, res) => {
  const { uid, newPlan } = req.body;

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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: 'https://customer.stephenscode.dev/upgrade-success',
    cancel_url: 'https://customer.stephenscode.dev/upgrade-cancel',
    metadata: {
      uid,
      newPlan
    }
  });

  res.json({ url: session.url });
});

// ✅ Stripe Webhook Endpoint
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const uid = session.metadata.uid;
    const newPlan = session.metadata.newPlan;

    // ✅ Update Firestore
    db.collection('customers').doc(uid).update({
      currentPlan: newPlan,
      lastPayment: new Date().toISOString()
    });
  }

  res.json({ received: true });
});

// ✅ Start the server
app.listen(3000, () => console.log('Backend server running on port 3000'));
