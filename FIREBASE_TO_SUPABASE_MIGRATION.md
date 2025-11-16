# Firebase to Supabase Migration Guide

**Date:** 2025-01-12
**Priority:** HIGH
**Estimated Time:** 3-4 hours

---

## 📋 Migration Overview

### Why Supabase?
- ✅ Open source (PostgreSQL based)
- ✅ Better pricing structure
- ✅ SQL database (easier complex queries)
- ✅ Built-in Row Level Security (RLS)
- ✅ Real-time subscriptions included
- ✅ Better developer experience
- ✅ Easier data export/backup

### Current Firebase Structure
**Collections:**
1. `customers` - Customer profiles and authentication
2. `orders` - Order/purchase data
3. `updateRequests` - Client update requests
4. `moduleRequests` - Module/feature requests
5. `privateFeedback` - Reviews under 5 stars
6. `creditTransactions` - Referral credit transaction log

**Storage:**
- `updateRequests/{userId}/{timestamp}_{filename}` - File uploads

---

## 🎯 Migration Phases

### Phase 1: Setup & Planning (30 minutes)
1. Create Supabase project
2. Design PostgreSQL schemas
3. Set up Row Level Security policies
4. Create migration scripts

### Phase 2: Data Export (30 minutes)
1. Export Firebase Firestore data
2. Export Firebase Auth users
3. Download Storage files
4. Backup everything

### Phase 3: Supabase Setup (1 hour)
1. Create tables with proper schemas
2. Import data with transformations
3. Set up Storage buckets
4. Configure Auth providers

### Phase 4: Code Migration (1-2 hours)
1. Update customer portal
2. Update admin dashboard
3. Update backend servers
4. Update checkout system

### Phase 5: Testing & Deployment (30 minutes)
1. Test all features
2. Verify data integrity
3. Deploy updates
4. Monitor for issues

---

## 📊 Supabase Table Schemas

### 1. customers Table

```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  referral_credits DECIMAL(10, 2) DEFAULT 0.00,
  google_analytics_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_auth_user_id ON customers(auth_user_id);
CREATE INDEX idx_customers_status ON customers(status);

-- RLS Policies
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own customer data"
  ON customers FOR SELECT
  USING (auth.uid() = auth_user_id);

-- Users can update their own data
CREATE POLICY "Users can update own customer data"
  ON customers FOR UPDATE
  USING (auth.uid() = auth_user_id);

-- Admins can view all (add admin role check)
CREATE POLICY "Admins can view all customers"
  ON customers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );
```

### 2. orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0.00,
  total DECIMAL(10, 2) NOT NULL,
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  items JSONB NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_stripe_session_id ON orders(stripe_session_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- RLS Policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );
```

### 3. customer_purchases Table (NEW - for assigned items)

```sql
CREATE TABLE customer_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_type TEXT CHECK (product_type IN ('one-time', 'subscription')),

  price DECIMAL(10, 2) NOT NULL,
  paid_amount DECIMAL(10, 2) NOT NULL,
  price_override DECIMAL(10, 2),
  override_reason TEXT,

  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'cancelled', 'expired', 'completed')),

  purchase_date TIMESTAMPTZ DEFAULT NOW(),
  expiry_date TIMESTAMPTZ,

  stripe_checkout_session_id TEXT,
  stripe_payment_intent_id TEXT,

  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_customer_purchases_customer_id ON customer_purchases(customer_id);
CREATE INDEX idx_customer_purchases_status ON customer_purchases(status);
CREATE INDEX idx_customer_purchases_product_id ON customer_purchases(product_id);

-- RLS Policies
ALTER TABLE customer_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases"
  ON customer_purchases FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all purchases"
  ON customer_purchases FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );
```

### 4. update_requests Table

```sql
CREATE TABLE update_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')),
  files JSONB DEFAULT '[]'::jsonb,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_update_requests_customer_id ON update_requests(customer_id);
CREATE INDEX idx_update_requests_status ON update_requests(status);
CREATE INDEX idx_update_requests_priority ON update_requests(priority);

-- RLS Policies
ALTER TABLE update_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own update requests"
  ON update_requests FOR SELECT
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own update requests"
  ON update_requests FOR INSERT
  WITH CHECK (
    customer_id IN (
      SELECT id FROM customers WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all update requests"
  ON update_requests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );
```

### 5. module_requests Table

```sql
CREATE TABLE module_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  module_name TEXT NOT NULL,
  description TEXT NOT NULL,
  estimated_cost DECIMAL(10, 2),
  quoted_price DECIMAL(10, 2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'approved', 'in-progress', 'completed', 'declined')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Similar indexes and RLS policies as update_requests
```

### 6. private_feedback Table

```sql
CREATE TABLE private_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  admin_response TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7. credit_transactions Table

```sql
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  type TEXT CHECK (type IN ('earned', 'spent', 'adjusted')),
  description TEXT NOT NULL,
  reference_id UUID, -- Link to order or other entity
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Indexes
CREATE INDEX idx_credit_transactions_customer_id ON credit_transactions(customer_id);
CREATE INDEX idx_credit_transactions_created_at ON credit_transactions(created_at DESC);
```

### 8. products Table (NEW - for catalog)

```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  type TEXT CHECK (type IN ('one-time', 'subscription')),
  base_price DECIMAL(10, 2) NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policy - public read
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );
```

---

## 🔧 Migration Scripts

### 1. Firebase Data Export Script

Create: `scripts/export-firebase-data.js`

```javascript
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function exportCollection(collectionName) {
  console.log(`Exporting ${collectionName}...`);
  const snapshot = await db.collection(collectionName).get();

  const data = [];
  snapshot.forEach(doc => {
    const docData = doc.data();

    // Convert Firestore Timestamps to ISO strings
    const converted = {};
    for (const [key, value] of Object.entries(docData)) {
      if (value && value.toDate && typeof value.toDate === 'function') {
        converted[key] = value.toDate().toISOString();
      } else {
        converted[key] = value;
      }
    }

    data.push({
      id: doc.id,
      ...converted
    });
  });

  // Save to JSON file
  const outputPath = path.join(__dirname, '../migration-data', `${collectionName}.json`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`✅ Exported ${data.length} documents from ${collectionName}`);
  return data;
}

async function exportAllData() {
  const collections = [
    'customers',
    'orders',
    'updateRequests',
    'moduleRequests',
    'privateFeedback',
    'creditTransactions'
  ];

  const allData = {};

  for (const collection of collections) {
    allData[collection] = await exportCollection(collection);
  }

  // Export Auth users
  console.log('Exporting Auth users...');
  const listUsersResult = await admin.auth().listUsers();
  const users = listUsersResult.users.map(user => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    disabled: user.disabled,
    metadata: user.metadata,
    providerData: user.providerData
  }));

  fs.writeFileSync(
    path.join(__dirname, '../migration-data/auth-users.json'),
    JSON.stringify(users, null, 2)
  );
  console.log(`✅ Exported ${users.length} auth users`);

  console.log('\n📊 Export Summary:');
  for (const [collection, data] of Object.entries(allData)) {
    console.log(`  ${collection}: ${data.length} documents`);
  }
  console.log(`  auth-users: ${users.length} users`);
}

exportAllData()
  .then(() => {
    console.log('\n✅ Export complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Export failed:', error);
    process.exit(1);
  });
```

### 2. Supabase Import Script

Create: `scripts/import-to-supabase.js`

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Use service role key
const supabase = createClient(supabaseUrl, supabaseKey);

async function importCollection(tableName, fileName) {
  console.log(`Importing ${fileName} to ${tableName}...`);

  const filePath = path.join(__dirname, '../migration-data', fileName);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Transform Firebase data to Supabase format
  const transformed = data.map(doc => {
    const { id, ...rest } = doc;

    // Convert field names from camelCase to snake_case
    const snakeCaseData = {};
    for (const [key, value] of Object.entries(rest)) {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      snakeCaseData[snakeKey] = value;
    }

    return snakeCaseData;
  });

  // Insert in batches of 100
  const batchSize = 100;
  let imported = 0;

  for (let i = 0; i < transformed.length; i += batchSize) {
    const batch = transformed.slice(i, i + batchSize);
    const { error } = await supabase.from(tableName).insert(batch);

    if (error) {
      console.error(`❌ Error importing batch ${i / batchSize + 1}:`, error);
    } else {
      imported += batch.length;
      console.log(`  Imported ${imported}/${transformed.length}...`);
    }
  }

  console.log(`✅ Imported ${imported} records to ${tableName}`);
}

async function importAuthUsers() {
  console.log('Importing auth users...');

  const filePath = path.join(__dirname, '../migration-data/auth-users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const user of users) {
    // Create auth user in Supabase
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      email_confirm: user.emailVerified,
      user_metadata: {
        full_name: user.displayName,
        avatar_url: user.photoURL
      }
    });

    if (error) {
      console.error(`❌ Error creating user ${user.email}:`, error.message);
    } else {
      console.log(`✅ Created user: ${user.email}`);
    }
  }
}

async function importAllData() {
  const collections = [
    { table: 'customers', file: 'customers.json' },
    { table: 'orders', file: 'orders.json' },
    { table: 'update_requests', file: 'updateRequests.json' },
    { table: 'module_requests', file: 'moduleRequests.json' },
    { table: 'private_feedback', file: 'privateFeedback.json' },
    { table: 'credit_transactions', file: 'creditTransactions.json' }
  ];

  // Import auth users first
  await importAuthUsers();

  // Then import data
  for (const { table, file } of collections) {
    await importCollection(table, file);
  }

  console.log('\n✅ Import complete!');
}

importAllData()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Import failed:', error);
    process.exit(1);
  });
```

---

## 📦 Package Updates

### Install Supabase Client

```bash
cd customer.stephenscode.dev
npm install @supabase/supabase-js

cd ../admin-dashboard
npm install @supabase/supabase-js

cd ../backend-server
npm install @supabase/supabase-js

cd ../clean-checkout-server
npm install @supabase/supabase-js
```

### Remove Firebase (after migration complete)

```bash
npm uninstall firebase firebase-admin
```

---

## 🔄 Code Migration Examples

### Supabase Client Setup

Create: `lib/supabase.js` (or `.ts`)

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Customer Registration (Supabase)

```javascript
// BEFORE (Firebase)
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

const userCredential = await createUserWithEmailAndPassword(auth, email, password);
await setDoc(doc(db, 'customers', userCredential.user.uid), {
  fullName, email, phone, address,
  createdAt: Timestamp.now()
});

// AFTER (Supabase)
import { supabase } from '../lib/supabase';

const { data: authData, error: authError } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: fullName
    }
  }
});

if (!authError) {
  const { error: insertError } = await supabase
    .from('customers')
    .insert({
      auth_user_id: authData.user.id,
      email,
      full_name: fullName,
      phone,
      address
    });
}
```

### Fetch Customers (Supabase)

```javascript
// BEFORE (Firebase)
const q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));
const snapshot = await getDocs(q);
const customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// AFTER (Supabase)
const { data: customers, error } = await supabase
  .from('customers')
  .select('*')
  .order('created_at', { ascending: false });
```

### Real-time Subscriptions (Supabase)

```javascript
// Subscribe to customer changes
const subscription = supabase
  .channel('customers-changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'customers'
  }, (payload) => {
    console.log('Change detected:', payload);
    // Update UI
  })
  .subscribe();

// Unsubscribe when component unmounts
return () => {
  supabase.removeChannel(subscription);
};
```

---

## ✅ Migration Checklist

### Pre-Migration
- [ ] Create Supabase project at https://supabase.com
- [ ] Note down Supabase URL and API keys
- [ ] Create `.env` files with Supabase credentials
- [ ] Install required packages

### Data Export
- [ ] Run Firebase export script
- [ ] Verify all collections exported to `migration-data/`
- [ ] Verify auth users exported
- [ ] Create backup of export files

### Supabase Setup
- [ ] Run table creation SQL scripts in Supabase SQL Editor
- [ ] Verify all tables created correctly
- [ ] Set up Row Level Security policies
- [ ] Configure Storage buckets
- [ ] Set up Auth providers (Google, email)

### Data Import
- [ ] Run Supabase import script
- [ ] Verify data imported correctly
- [ ] Check row counts match export
- [ ] Verify auth users created

### Code Migration
- [ ] Update customer portal
  - [ ] Login page
  - [ ] Register page
  - [ ] Dashboard
  - [ ] All data fetching
- [ ] Update admin dashboard
  - [ ] All pages
  - [ ] All queries
  - [ ] Real-time updates
- [ ] Update backend servers
- [ ] Update checkout system

### Testing
- [ ] Test customer registration
- [ ] Test customer login
- [ ] Test admin login
- [ ] Test data display
- [ ] Test data updates
- [ ] Test file uploads
- [ ] Test real-time updates

### Deployment
- [ ] Update environment variables
- [ ] Deploy customer portal
- [ ] Deploy admin dashboard
- [ ] Deploy backend servers
- [ ] Monitor for errors

### Post-Migration
- [ ] Monitor logs for issues
- [ ] Verify all features work
- [ ] Keep Firebase running for 1 week (fallback)
- [ ] After verification, shut down Firebase

---

## 🚀 Next Steps

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create new project
   - Note credentials

2. **Run Export Script**
   ```bash
   cd "c:\Users\usmc3\OneDrive\Documents\stephenscode-site"
   mkdir scripts migration-data
   # Create export script
   node scripts/export-firebase-data.js
   ```

3. **Set Up Supabase Tables**
   - Copy SQL from this document
   - Run in Supabase SQL Editor

4. **Run Import Script**
   ```bash
   node scripts/import-to-supabase.js
   ```

5. **Update Code**
   - Start with customer portal
   - Then admin dashboard
   - Test thoroughly

---

**Estimated Total Time:** 3-4 hours
**Difficulty:** Medium
**Risk Level:** Medium (have backups!)
**Rollback Plan:** Keep Firebase running, can revert code changes

Would you like me to start with any specific phase?
