# Customer Portal & Admin Dashboard Fixes

**Date:** 2025-01-12
**Priority:** CRITICAL
**Status:** In Progress

---

## 🔴 Critical Issues Identified

### 1. Customer Not Showing in Admin Portal (amwairconditioning)

**Root Cause:**
- Customer registration/login stores `createdAt` as **ISO string** (`new Date().toISOString()`)
- Admin portal queries with `orderBy('createdAt', 'desc')` expecting **Firebase Timestamp**
- Query fails silently or excludes customers with incorrect timestamp format

**Affected Files:**
- `customer.stephenscode.dev/src/pages/Register.jsx` (line 34)
- `customer.stephenscode.dev/src/pages/Login.jsx` (line 39)
- `admin-dashboard/src/pages/Customers.jsx` (line 20)

**Fix:**
Change from:
```javascript
createdAt: new Date().toISOString()  // ❌ Wrong
```

To:
```javascript
import { Timestamp } from 'firebase/firestore';
createdAt: Timestamp.now()  // ✅ Correct
```

### 2. Missing Paid Items Assignment System

**Current State:** No system exists to assign purchased items to customer accounts

**Required Features:**
1. Admin interface to assign items to customers
2. Support for one-time purchases and subscriptions
3. Pricing override capability
4. Item status tracking (active, cancelled, expired)
5. Purchase history

**New Collections Needed:**
- `customerPurchases` - Track all customer purchases
- `products` - Available products/services catalog

---

## 🛠️ Fixes to Implement

### Fix 1: Update Customer Registration (Register.jsx)

**File:** `customer.stephenscode.dev/src/pages/Register.jsx`

**Before:**
```javascript
import { doc, setDoc } from 'firebase/firestore';

await setDoc(doc(db, 'customers', userId), {
  fullName: form.fullName,
  email: form.email,
  phone: form.phone,
  address: form.address,
  createdAt: new Date().toISOString()  // ❌ Wrong
});
```

**After:**
```javascript
import { doc, setDoc, Timestamp } from 'firebase/firestore';

await setDoc(doc(db, 'customers', userId), {
  fullName: form.fullName,
  email: form.email,
  phone: form.phone,
  address: form.address,
  createdAt: Timestamp.now(),  // ✅ Correct
  status: 'active',
  referralCredits: 0,
  googleAnalyticsId: '',
  updatedAt: Timestamp.now()
});
```

### Fix 2: Update Google Login (Login.jsx)

**File:** `customer.stephenscode.dev/src/pages/Login.jsx`

**Before:**
```javascript
if (!docSnap.exists()) {
  await setDoc(userDocRef, {
    email: result.user.email,
    fullName: result.user.displayName || '',
    phone: '',
    address: '',
    createdAt: new Date().toISOString()  // ❌ Wrong
  });
}
```

**After:**
```javascript
import { Timestamp } from 'firebase/firestore';

if (!docSnap.exists()) {
  await setDoc(userDocRef, {
    email: result.user.email,
    fullName: result.user.displayName || '',
    phone: '',
    address: '',
    createdAt: Timestamp.now(),  // ✅ Correct
    status: 'active',
    referralCredits: 0,
    googleAnalyticsId: '',
    updatedAt: Timestamp.now()
  });
}
```

### Fix 3: Update Admin Customers Query (Customers.jsx)

**File:** `admin-dashboard/src/pages/Customers.jsx`

**Add Error Handling:**
```javascript
const fetchCustomers = async () => {
  try {
    // Try with orderBy first
    const q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const customerList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCustomers(customerList);
  } catch (error) {
    console.error('Error fetching customers with orderBy:', error);

    // Fallback: Fetch without orderBy if timestamp format is wrong
    try {
      const snapshot = await getDocs(collection(db, 'customers'));
      const customerList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => {
        // Try to sort by createdAt if it exists
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });
      setCustomers(customerList);
    } catch (fallbackError) {
      console.error('Error fetching customers (fallback):', fallbackError);
      alert('Error loading customers. Please check Firebase connection.');
    }
  } finally {
    setLoading(false);
  }
};
```

### Fix 4: Create Customer Purchases Management System

**New File:** `admin-dashboard/src/pages/CustomerPurchases.jsx`

**Features:**
1. **View Customer Purchases**
   - List all purchases for selected customer
   - Show product name, price, status, purchase date
   - Filter by status (active, cancelled, expired)

2. **Assign New Purchase**
   - Select customer from dropdown
   - Select product/service from catalog
   - Override price (optional)
   - Set status (active/pending)
   - Add notes

3. **Manage Purchase**
   - Change status (active → cancelled)
   - Update pricing
   - Add payment information
   - Link to Stripe checkout session

**Firebase Schema:**

```javascript
// Collection: customerPurchases
{
  customerId: "user_uid",
  customerName: "John Doe",
  customerEmail: "john@example.com",

  productId: "product_123",
  productName: "Standard Website",
  productType: "one-time" | "subscription",

  price: 850.00,  // Original price
  paidAmount: 850.00,  // Amount actually paid (after credits/overrides)
  priceOverride: null | 750.00,  // Admin override price
  overrideReason: "Veteran discount",

  status: "active" | "pending" | "cancelled" | "expired" | "completed",

  purchaseDate: Timestamp,
  expiryDate: Timestamp | null,

  stripeCheckoutSessionId: "cs_test_xxx",
  stripePaymentIntentId: "pi_xxx",

  notes: "Custom project requirements...",

  createdAt: Timestamp,
  updatedAt: Timestamp,
  createdBy: "admin_uid",
  updatedBy: "admin_uid"
}
```

**Products Catalog Schema:**

```javascript
// Collection: products
{
  id: "plug-and-play",
  name: "Plug and Play",
  description: "Professional design for WIX, GoDaddy, or similar platforms",
  category: "website",
  type: "one-time",

  pricing: {
    basePrice: 250.00,
    currency: "USD"
  },

  features: [
    "Custom design on your existing platform",
    "Up to 5 pages",
    "Mobile-responsive layout"
  ],

  active: true,

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🚀 Implementation Plan

### Phase 1: Fix Existing Customer Display (IMMEDIATE)
**Time Estimate:** 30 minutes

1. [x] Identify root cause (COMPLETED)
2. [ ] Update Register.jsx with Timestamp
3. [ ] Update Login.jsx with Timestamp
4. [ ] Add error handling to Customers.jsx
5. [ ] Test with existing amwairconditioning customer
6. [ ] Verify customer shows in admin portal

### Phase 2: Create Products Catalog (1-2 hours)

1. [ ] Create products collection structure
2. [ ] Seed initial products from services-data
3. [ ] Create admin interface to manage products
4. [ ] Add product categories and types

### Phase 3: Customer Purchases System (2-3 hours)

1. [ ] Create CustomerPurchases.jsx admin page
2. [ ] Build UI for assigning purchases
3. [ ] Implement price override functionality
4. [ ] Add purchase status management
5. [ ] Create customer view to see their purchases

### Phase 4: Stripe Integration (1-2 hours)

1. [ ] Link purchases to Stripe checkout sessions
2. [ ] Store payment intent IDs
3. [ ] Add webhook placeholder (manual for now)
4. [ ] Create manual payment completion flow

---

## 📋 Testing Checklist

### Test Existing Customer Fix
- [ ] amwairconditioning customer appears in admin portal
- [ ] All customer data displays correctly
- [ ] Can toggle customer status
- [ ] Can view customer details modal
- [ ] Registration creates customer with Timestamp
- [ ] Google login creates customer with Timestamp

### Test Purchase Assignment
- [ ] Admin can assign purchase to customer
- [ ] Price override works correctly
- [ ] Customer sees assigned purchase in portal
- [ ] Purchase status can be changed
- [ ] Purchase history displays properly

### Test Stripe Flow (Manual)
- [ ] Can create checkout session
- [ ] Can manually mark purchase as paid
- [ ] Stripe session ID stored correctly
- [ ] Payment amount matches purchase price

---

## 🔧 Quick Fix Commands

```bash
# Navigate to customer portal
cd "c:\Users\usmc3\OneDrive\Documents\stephenscode-site\customer.stephenscode.dev"

# Navigate to admin dashboard
cd "c:\Users\usmc3\OneDrive\Documents\stephenscode-site\admin-dashboard"
```

---

## 📊 Migration Script (For Existing Customers)

If there are existing customers with ISO string timestamps, run this migration:

```javascript
// Migration script: fix-customer-timestamps.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function fixTimestamps() {
  const customersRef = db.collection('customers');
  const snapshot = await customersRef.get();

  const batch = db.batch();
  let count = 0;

  snapshot.forEach(doc => {
    const data = doc.data();

    // Check if createdAt is a string
    if (typeof data.createdAt === 'string') {
      const timestamp = admin.firestore.Timestamp.fromDate(new Date(data.createdAt));
      batch.update(doc.ref, {
        createdAt: timestamp,
        updatedAt: admin.firestore.Timestamp.now()
      });
      count++;
      console.log(`Fixing timestamp for: ${doc.id}`);
    }
  });

  if (count > 0) {
    await batch.commit();
    console.log(`✅ Fixed ${count} customer timestamps`);
  } else {
    console.log('✅ No timestamps need fixing');
  }
}

fixTimestamps().catch(console.error);
```

---

## 💡 Additional Enhancements (Future)

1. **Automated Stripe Webhooks**
   - Auto-create purchase records from successful payments
   - Auto-update purchase status on cancellation
   - Handle refunds automatically

2. **Subscription Management**
   - Recurring billing support
   - Auto-renew handling
   - Expiry notifications

3. **Customer Portal Purchases View**
   - Customers can see their purchases
   - Download invoices
   - Upgrade/downgrade options

4. **Reporting Dashboard**
   - Revenue analytics
   - Purchase trends
   - Customer lifetime value

---

**Last Updated:** 2025-01-12
**Next Review:** After Phase 1 completion
