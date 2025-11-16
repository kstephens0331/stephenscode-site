# Download Firebase Service Account Keys

Before running the export script, you need to download service account keys for **BOTH** Firebase projects.

---

## Step 1: Download Customer Portal Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **customer-stephenscode**
3. Click the ⚙️ gear icon → **Project Settings**
4. Navigate to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Save the file as: `serviceAccountKey-customer.json` in the project root

**Path should be:**
```
c:\Users\usmc3\OneDrive\Documents\stephenscode-site\serviceAccountKey-customer.json
```

---

## Step 2: Download Admin Dashboard Key

1. Stay in [Firebase Console](https://console.firebase.google.com/)
2. Switch to project: **admin-dashboard-stephenscode**
3. Click the ⚙️ gear icon → **Project Settings**
4. Navigate to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Save the file as: `serviceAccountKey-admin.json` in the project root

**Path should be:**
```
c:\Users\usmc3\OneDrive\Documents\stephenscode-site\serviceAccountKey-admin.json
```

---

## Step 3: Verify Files

Run this command to verify both files exist:

```bash
ls serviceAccountKey-*.json
```

You should see:
```
serviceAccountKey-admin.json
serviceAccountKey-customer.json
```

---

## Step 4: Run Export Script

Once both files are in place, run:

```bash
node scripts/export-all-firebase-data.js
```

---

## Security Notes

⚠️ **IMPORTANT:**
- These files contain **sensitive credentials**
- DO NOT commit them to Git (already in .gitignore)
- DO NOT share them publicly
- Keep them secure and delete after migration if not needed

---

## What the Export Will Do

The script will:
1. Connect to **customer-stephenscode** project
   - Export all Firestore collections
   - Export all Auth users

2. Connect to **admin-dashboard-stephenscode** project
   - Export all Firestore collections
   - Export all Auth users

3. Save everything to `migration-data/` folder with filenames like:
   - `customer-stephenscode_customers.json`
   - `customer-stephenscode_auth_users.json`
   - `admin-dashboard-stephenscode_customers.json`
   - `admin-dashboard-stephenscode_auth_users.json`
   - etc.

---

## Expected Output

```
🎯 Firebase to Supabase Migration - Data Export
================================================

============================================================
🚀 Starting export from: customer-stephenscode
============================================================

📦 Exporting customers from customer-stephenscode...
✅ Exported 1 documents from customers

📦 Exporting orders from customer-stephenscode...
✅ Exported 0 documents from orders

👥 Exporting Auth users from customer-stephenscode...
✅ Exported 1 auth users

============================================================
🚀 Starting export from: admin-dashboard-stephenscode
============================================================

📦 Exporting customers from admin-dashboard-stephenscode...
✅ Exported 0 documents from customers

...

============================================================
✅ Export Complete!
============================================================

📁 Data saved to: migration-data/
📊 Summary saved to: _export-summary.json

🎉 Ready for Supabase import!
```

---

## Troubleshooting

### "Service account file not found"
- Verify you downloaded the JSON files
- Verify they're named correctly: `serviceAccountKey-customer.json` and `serviceAccountKey-admin.json`
- Verify they're in the project root directory

### "Permission denied" errors
- Make sure the service account has proper permissions
- Try regenerating the key in Firebase Console

### "Collection not found" errors
- This is normal if a collection doesn't exist in a project
- The script will continue with other collections

---

**Ready?** Download both service account keys and run the export script!
