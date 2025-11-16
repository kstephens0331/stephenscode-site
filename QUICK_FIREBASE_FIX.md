# Firebase Security Rules - Cross-Project Access Fix

## The Problem
Admin dashboard authenticates through `admin-dashboard-stephenscode` project, but needs to access data from `customer-stephenscode` and `stephenscode-12f75` projects. Firebase doesn't support cross-project authentication by default, causing permission errors.

## Quick Fix (Deploy Open Rules)

**IMPORTANT:** These rules are temporarily open for development. Deploy proper authentication later using Firebase Admin SDK.

### Step 1: Deploy to customer-stephenscode

1. Go to https://console.firebase.google.com/
2. Select **customer-stephenscode** project
3. Click **Firestore Database** → **Rules** tab
4. Copy/paste the contents of `firestore.rules`:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Click **Publish**

### Step 2: Deploy to stephenscode-12f75

1. Select **stephenscode-12f75** project
2. Click **Firestore Database** → **Rules** tab
3. Copy/paste the contents of `firestore-orders.rules`:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. Click **Publish**

## What This Fixes

After deploying these rules:
- ✅ Customer list will load in admin dashboard
- ✅ Orders list will load in admin dashboard
- ✅ Add Order customer auto-complete will work
- ✅ Customer registration will auto-link existing orders
- ✅ Manual re-link button will work

## Security Note

⚠️ **These rules allow unrestricted access.** For production, implement proper security using one of these approaches:
1. Use Firebase Admin SDK on a backend server
2. Consolidate all authentication into one Firebase project
3. Use custom tokens for cross-project authentication

Refresh your admin dashboard and both customer list and orders should appear.
