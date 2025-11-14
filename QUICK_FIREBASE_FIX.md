# Quick Firebase Security Rules Fix

## The Problem
Admin dashboard can't read customer data due to missing permissions.

## The 2-Minute Fix

### Option 1: Firebase Console (Easiest - 2 minutes)

1. Go to https://console.firebase.google.com/
2. Select **customer-stephenscode** project
3. Click **Firestore Database** → **Rules** tab
4. Copy/paste the contents of `firestore.rules` from this directory
5. Click **Publish**
6. Repeat for **stephenscode-12f75** project using `firestore-orders.rules`

### Option 2: Firebase CLI (Automated - 5 minutes)

```bash
# Install Firebase CLI if needed
npm install -g firebase-tools

# Login
firebase login

# Deploy customer database rules
firebase use customer-stephenscode
firebase deploy --only firestore:rules

# Deploy orders database rules (requires updating firestore.rules first)
firebase use stephenscode-12f75
firebase deploy --only firestore:rules
```

## What This Fixes

After deploying these rules:
- ✅ Customer list will load in admin dashboard
- ✅ Add Order customer auto-complete will work
- ✅ Customer registration will auto-link existing orders
- ✅ Manual re-link button will work

## That's It!

Refresh your admin dashboard and the customer list should appear.
