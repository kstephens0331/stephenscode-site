# Firebase to Supabase Migration - Quick Start

**Start Here!** Follow these steps in order.

---

## ⚡ Quick Steps

### Step 1: Create Supabase Project (5 minutes)

1. Go to https://supabase.com
2. Sign in / Sign up
3. Click "New Project"
4. Fill in:
   - **Name:** StephensCode
   - **Database Password:** (create strong password, save it!)
   - **Region:** Choose closest to you
5. Wait for project to be created (~2 minutes)
6. Once ready, click "Project Settings" → "API"
7. **Copy and save these:**
   - Project URL
   - `anon` public key
   - `service_role` key (keep secret!)

---

### Step 2: Export Firebase Data (10 minutes)

**Prerequisites:**
- Need Firebase service account key JSON file

**If you don't have service account key:**
1. Go to Firebase Console
2. Project Settings → Service Accounts
3. Click "Generate New Private Key"
4. Save as `serviceAccountKey.json` in project root

**Run export:**

```bash
cd "c:\Users\usmc3\OneDrive\Documents\stephenscode-site"

# Install firebase-admin if not already installed
npm install firebase-admin

# Run export script
node scripts/export-firebase-data.js
```

**Expected output:**
```
🚀 Starting Firebase data export...

📦 Exporting customers...
✅ Exported 1 documents from customers

📦 Exporting orders...
✅ Exported X documents from orders

...

✅ Export complete!
📁 Data saved to: migration-data/
```

**Verify export:**
- Check `migration-data/` folder exists
- Check JSON files created for each collection
- Check `_export-summary.json` shows counts

---

### Step 3: Set Up Supabase Tables (15 minutes)

**In Supabase Dashboard:**

1. Click "SQL Editor" in left sidebar
2. Click "+ New Query"
3. Copy and paste each table creation script from `FIREBASE_TO_SUPABASE_MIGRATION.md`
4. Run each script (click "Run" or Ctrl+Enter)

**Tables to create (in order):**
1. `customers` table
2. `orders` table
3. `customer_purchases` table (NEW)
4. `update_requests` table
5. `module_requests` table
6. `private_feedback` table
7. `credit_transactions` table
8. `products` table (NEW)

**After each table:**
- Verify "Success" message
- Check "Table Editor" in sidebar - table should appear

---

### Step 4: Create Environment Files (5 minutes)

**Customer Portal:**

Create: `customer.stephenscode.dev/.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Admin Dashboard:**

Create: `admin-dashboard/.env` (or `.env.local`)

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Backend Server:**

Create/Update: `backend-server/.env`

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

---

### Step 5: Install Supabase Packages (5 minutes)

```bash
# Customer Portal
cd "c:\Users\usmc3\OneDrive\Documents\stephenscode-site\customer.stephenscode.dev"
npm install @supabase/supabase-js

# Admin Dashboard
cd "../admin-dashboard"
npm install @supabase/supabase-js

# Backend Server (if applicable)
cd "../backend-server"
npm install @supabase/supabase-js
```

---

### Step 6: Import Data to Supabase (HOLD - Manual for now)

**Option A: Manual Import (Recommended for first time)**

1. In Supabase Dashboard, go to "Table Editor"
2. Select `customers` table
3. Click "Insert" → "Insert row"
4. Manually add amwairconditioning customer:
   - email: admin@amwairconditioning.com
   - full_name: (from Firebase)
   - phone, address: (from Firebase)
   - status: active
   - referral_credits: 0

**Option B: Script Import (Advanced)**
- Create import script
- Test with small dataset first
- Then import all data

---

### Step 7: Update Customer Portal Code (30 minutes)

**Priority files to update:**

1. **Create Supabase client:**

`customer.stephenscode.dev/src/lib/supabase.js`

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

2. **Update Login page:**

`customer.stephenscode.dev/src/pages/Login.jsx`

Replace Firebase imports and auth with Supabase

3. **Update Register page:**

`customer.stephenscode.dev/src/pages/Register.jsx`

Replace Firebase with Supabase

4. **Update all data fetching**

Replace Firestore queries with Supabase queries

---

### Step 8: Test Customer Portal (15 minutes)

```bash
cd "c:\Users\usmc3\OneDrive\Documents\stephenscode-site\customer.stephenscode.dev"
npm run dev
```

**Test:**
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard loads
- [ ] Data displays correctly

---

### Step 9: Update Admin Dashboard (30 minutes)

Same process as customer portal:
1. Create Supabase client
2. Update all pages to use Supabase
3. Test thoroughly

---

### Step 10: Final Verification (15 minutes)

**Checklist:**
- [ ] Customer registration creates user in Supabase
- [ ] Customer login works
- [ ] Admin can see customers
- [ ] Data matches Firebase export
- [ ] No console errors
- [ ] All features work

---

## 🆘 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Invalid API key"
- Check `.env` file has correct keys
- Restart dev server after adding `.env`

### "Row Level Security policy violation"
- Check RLS policies in Supabase
- Verify user is authenticated
- Check user has correct permissions

### Data not showing
- Check table has data (Table Editor)
- Check RLS policies allow read
- Check query is correct
- Check console for errors

---

## 📞 Need Help?

**Common Issues:**
- Firebase export fails → Check service account key path
- Supabase table creation fails → Check syntax, run one at a time
- Auth not working → Check environment variables
- Data not showing → Check RLS policies

**Resources:**
- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com

---

## ⏱️ Time Estimates

- **Phase 1 (Setup):** 30 minutes
- **Phase 2 (Export):** 15 minutes
- **Phase 3 (Tables):** 20 minutes
- **Phase 4 (Code):** 2 hours
- **Phase 5 (Testing):** 30 minutes

**Total:** ~3.5 hours

---

## 🎯 Success Criteria

Migration is successful when:
- ✅ All Firebase data exported
- ✅ All Supabase tables created
- ✅ Customer registration works
- ✅ Customer login works
- ✅ Admin dashboard works
- ✅ Data displays correctly
- ✅ All features functional
- ✅ No Firebase dependencies remain

---

**Ready to start?** Begin with Step 1!
