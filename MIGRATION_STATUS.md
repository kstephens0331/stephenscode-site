# Firebase to Supabase Migration - Status

**Date:** 2025-01-12
**Status:** Ready to Export Data

---

## 🔍 Critical Discovery: Two Firebase Projects

During migration preparation, we discovered that there are **TWO separate Firebase projects**:

### Project 1: customer-stephenscode
- **Used by:** Customer Portal (`customer.stephenscode.dev`)
- **Contains:** Actual customer data including amwairconditioning
- **Config:** `customer.stephenscode.dev/src/firebase.js`
- **Collections:** customers, orders, etc.
- **Auth Users:** Customer accounts

### Project 2: admin-dashboard-stephenscode
- **Used by:** Admin Dashboard (`admin-dashboard`)
- **Contains:** Likely empty or different data
- **Config:** `admin-dashboard/src/auth/firebase.js`
- **Collections:** May be empty
- **Auth Users:** Admin accounts

---

## ⚠️ Why amwairconditioning Wasn't Showing

**Root Cause:**
1. Customer registered via customer portal → Saved to `customer-stephenscode` project
2. Admin dashboard connected to `admin-dashboard-stephenscode` project
3. Admin queries a DIFFERENT database → Customer not found

**This explains everything!** The customer data exists, but the admin was looking in the wrong Firebase project.

---

## 📋 Migration Strategy

### Option A: Consolidate to Supabase (RECOMMENDED)
Migrate BOTH Firebase projects to a single Supabase database:
- ✅ Single source of truth
- ✅ Both portals access same data
- ✅ No more sync issues
- ✅ Easier to manage

### Option B: Keep Separate (Not Recommended)
Maintain two Supabase projects:
- ❌ Data duplication issues
- ❌ Sync complexity
- ❌ Same problems as before

**Decision: Go with Option A** - Consolidate everything into one Supabase project.

---

## 🎯 Current Migration Status

### ✅ Completed
1. Identified root cause of customer display issue
2. Created comprehensive migration documentation
3. Created dual-project export script
4. Updated .gitignore for security
5. Created service key download guide

### 🚧 In Progress
1. **Waiting for service account keys** to be downloaded
   - Need: `serviceAccountKey-customer.json`
   - Need: `serviceAccountKey-admin.json`

### 📝 Next Steps
1. Download service account keys (see [DOWNLOAD_SERVICE_KEYS.md](./DOWNLOAD_SERVICE_KEYS.md))
2. Run export script: `node scripts/export-all-firebase-data.js`
3. Verify exported data
4. Create Supabase project
5. Set up Supabase tables
6. Import data to Supabase
7. Update all code to use Supabase
8. Test thoroughly

---

## 📁 Files Created

### Export & Migration Scripts
- ✅ `scripts/export-all-firebase-data.js` - Exports from BOTH Firebase projects
- ✅ `scripts/export-firebase-data.js` - Original single-project script (backup)

### Documentation
- ✅ `FIREBASE_TO_SUPABASE_MIGRATION.md` - Complete technical guide
- ✅ `MIGRATION_QUICK_START.md` - Step-by-step instructions
- ✅ `DOWNLOAD_SERVICE_KEYS.md` - Service account key download guide
- ✅ `MIGRATION_STATUS.md` - This file
- ✅ `CUSTOMER_PORTAL_FIXES.md` - Original issue investigation
- ✅ `FIREBASE_PROJECT_ISSUE.md` - Multiple project discovery

---

## 🔧 What We'll Export

### From customer-stephenscode:
```
📦 Collections:
  - customers (1+ documents including amwairconditioning)
  - orders (purchase history)
  - updateRequests
  - moduleRequests
  - privateFeedback
  - creditTransactions
  - products (if exists)

👥 Auth Users:
  - All customer accounts (email/password + Google OAuth)
```

### From admin-dashboard-stephenscode:
```
📦 Collections:
  - customers (likely empty or different)
  - orders
  - updateRequests
  - moduleRequests
  - privateFeedback
  - creditTransactions
  - products

👥 Auth Users:
  - Admin accounts
```

---

## 🎯 Supabase Structure (Consolidated)

### Single Database Schema:

**customers** table:
- id (UUID, links to auth.users)
- email, full_name, phone, address
- status, referral_credits
- created_at, updated_at

**orders** table:
- id (UUID)
- customer_id (FK → customers)
- items (JSONB array)
- total, status
- stripe_session_id
- created_at

**customer_purchases** table (NEW):
- id (UUID)
- customer_id (FK → customers)
- product_id (FK → products)
- price, paid_amount, price_override
- status, purchase_date
- stripe_checkout_session_id
- notes

**products** table (NEW):
- id (UUID)
- name, description, category
- type (one-time/subscription)
- base_price
- active, features
- created_at, updated_at

**update_requests**, **module_requests**, **private_feedback**, **credit_transactions** tables as documented.

---

## 🔐 Security Considerations

### Service Account Keys
- ⚠️ These are HIGHLY sensitive
- ✅ Already added to .gitignore
- ✅ Will be deleted after migration
- ❌ Never commit to Git
- ❌ Never share publicly

### Data Export
- ✅ Exported data goes to `migration-data/`
- ✅ Already added to .gitignore
- ✅ Will be deleted after successful migration
- ⚠️ Contains customer PII - handle carefully

---

## ⏱️ Time Estimates

| Phase | Task | Time |
|-------|------|------|
| 1 | Download service keys | 5 min |
| 2 | Run export script | 5-10 min |
| 3 | Create Supabase project | 5 min |
| 4 | Set up tables & RLS | 30 min |
| 5 | Import data | 15 min |
| 6 | Update customer portal | 1 hour |
| 7 | Update admin dashboard | 1 hour |
| 8 | Testing | 30 min |
| **Total** | | **~3.5 hours** |

---

## 🚀 Ready to Start?

**Next Action:** Download the two service account keys using the guide in [DOWNLOAD_SERVICE_KEYS.md](./DOWNLOAD_SERVICE_KEYS.md)

Once you have both files:
```bash
# Verify files exist
ls serviceAccountKey-*.json

# Should show:
# serviceAccountKey-admin.json
# serviceAccountKey-customer.json

# Run export
node scripts/export-all-firebase-data.js
```

---

## 📞 Questions?

### "Do we need both projects?"
No! That's the problem. We'll consolidate to one Supabase database.

### "Will we lose data?"
No! We're exporting everything from both projects first.

### "What about the admin account?"
We'll migrate admin Auth users separately and give them appropriate roles in Supabase.

### "Can we test before switching?"
Yes! We can set up Supabase and test thoroughly before decommissioning Firebase.

---

**Last Updated:** 2025-01-12
**Next Review:** After data export completes
