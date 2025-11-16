# Firebase Project Configuration Issue

**Date:** 2025-01-12
**Status:** IDENTIFIED - Configuration Mismatch

---

## 🔍 Issue Identified

### Customer Data Found in Firebase!
**amwairconditioning customer EXISTS with:**
- ✅ Email: `admin@amwairconditioning.com`
- ✅ `createdAt`: May 28, 2025 (proper Firebase Timestamp)
- ✅ `items` array with purchase data (Standard Website - $378.88)
- ✅ All data looks correct

### Multiple Firebase Projects Detected
You have **3 different Firebase projects:**

1. **StephensCode** (`stephenscode-12f75`)
2. **admin-dashboard-stephenscode** (admin-dashboard-stephenscode)
3. **customer stephenscode** (StephensCode stephenscode-12f75)

**PROBLEM:** The admin dashboard may be connecting to a **different Firebase project** than where the customer data actually exists!

---

## 🔧 Solution: Verify Firebase Configuration

### Step 1: Check Which Project Has the Customer Data

**In Firebase Console:**
1. Open each project one by one
2. Go to Firestore Database → `customers` collection
3. Look for `admin@amwairconditioning.com`
4. Note which project contains this customer

**Most Likely:** The customer is in `stephenscode-12f75` (main project)

### Step 2: Check Admin Dashboard Firebase Config

**File to Check:** `admin-dashboard/src/auth/firebase.js` or `admin-dashboard/src/firebase.js`

**What to Look For:**
```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "stephenscode-12f75", // ← Should match where customer data is!
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

**If `projectId` is wrong, admin dashboard is connecting to wrong project!**

### Step 3: Check Customer Portal Firebase Config

**File to Check:** `customer.stephenscode.dev/src/firebase.js`

**Verify it matches the project with customer data**

### Step 4: Verify All Config Files Match

**Files to Check:**
1. `admin-dashboard/src/auth/firebase.js` (or `/src/firebase.js`)
2. `customer.stephenscode.dev/src/firebase.js`
3. `backend-server/.env` or Firebase config
4. `clean-checkout-server/.env` or Firebase config

**All should point to same project:** `stephenscode-12f75` (most likely)

---

## 🚀 Quick Fix Steps

### Option 1: Update Admin Dashboard Config (RECOMMENDED)

1. **Find the firebase config file:**
```bash
# Check which file exists
dir "c:\Users\usmc3\OneDrive\Documents\stephenscode-site\admin-dashboard\src" | findstr firebase
```

2. **Update the config to match main project:**
```javascript
// Should match the project where customers exist
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "stephenscode-12f75.firebaseapp.com",
  projectId: "stephenscode-12f75",  // ← CRITICAL
  storageBucket: "stephenscode-12f75.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
```

3. **Restart admin dashboard:**
```bash
cd "c:\Users\usmc3\OneDrive\Documents\stephenscode-site\admin-dashboard"
npm run dev
```

4. **Test:**
- Login to admin
- Check if amwairconditioning customer now appears

### Option 2: Consolidate to Single Firebase Project

**If using multiple projects unintentionally:**

1. **Choose primary project:** `stephenscode-12f75` (has customer data)
2. **Update ALL configs to point to this project**
3. **Delete or deprecate other projects if unused**

---

## 📋 Configuration Files to Check

### 1. Admin Dashboard Firebase Config
**Location:** `admin-dashboard/src/auth/firebase.js` OR `admin-dashboard/src/firebase.js`

**Check:**
```javascript
projectId: "???"  // What is this set to?
```

### 2. Customer Portal Firebase Config
**Location:** `customer.stephenscode.dev/src/firebase.js`

**Check:**
```javascript
projectId: "???"  // Should match admin dashboard
```

### 3. Backend Server (if applicable)
**Location:** `backend-server/.env` or config file

**Check:**
```
FIREBASE_PROJECT_ID=???
```

### 4. Checkout Server
**Location:** `clean-checkout-server/.env` or config file

**Check:**
```
FIREBASE_PROJECT_ID=???
```

---

## 🎯 Expected Result

**After fixing config mismatch:**

1. ✅ Admin dashboard connects to correct project
2. ✅ `amwairconditioning` customer appears in Customers list
3. ✅ Customer data displays: email, items array, purchase info
4. ✅ Can view/edit customer details
5. ✅ Can see purchase: Standard Website ($378.88)

---

## 💡 Why This Happened

**Multiple Firebase Projects Created:**
- During development, multiple Firebase projects were initialized
- Each part of system (admin, customer portal, checkout) may have gotten separate projects
- Common during initial setup/testing

**Items Array Indicates Stripe Integration:**
- Customer has `items` array with purchase data
- Suggests Stripe checkout session successfully created customer
- Stripe likely added customer to correct project
- But admin dashboard may be looking at different project

---

## 🔍 Diagnostic Commands

**Check all Firebase config files:**

```bash
# Search for Firebase configs
cd "c:\Users\usmc3\OneDrive\Documents\stephenscode-site"
findstr /s /i "projectId" admin-dashboard\src\*.js customer.stephenscode.dev\src\*.js backend-server\*.env clean-checkout-server\*.env
```

**Expected Output:**
- All should show same `projectId`
- If different, that's the problem!

---

## 📊 Customer Data Structure Found

**amwairconditioning customer has:**

```javascript
{
  email: "admin@amwairconditioning.com",
  createdAt: Timestamp (May 28, 2025),
  items: [
    {
      id: "Core Packages-0",
      title: "Standard Website",
      description: "Home, About, Services, Contact pages, Admin back office & customer login, Responsive design",
      price: 350,
      quantity: 1
    }
  ],
  subtotal: 350,
  tax: 28.88,
  total: 378.88,
  // ... other fields
}
```

**This is GOOD data!** Just need admin to connect to right project.

---

## ✅ Action Plan

### Immediate (5 minutes)
1. [ ] Find admin dashboard firebase config file
2. [ ] Check `projectId` value
3. [ ] Compare to project where customer data exists
4. [ ] Update if mismatch
5. [ ] Restart admin dashboard
6. [ ] Test - customer should now appear!

### Follow-up (15 minutes)
1. [ ] Check all other configs match
2. [ ] Consolidate to single project if needed
3. [ ] Document correct project ID for team
4. [ ] Update `.env.example` files with correct project

### Future Prevention
1. [ ] Create `.env` files for each project with correct IDs
2. [ ] Document which Firebase project is "production"
3. [ ] Consider deprecating unused projects
4. [ ] Add config validation on startup

---

## 🆘 If Still Not Working

**After fixing config, if customer still doesn't show:**

1. **Check Firebase Auth:**
   - Admin logged in with correct account?
   - Admin has read permissions on Firestore?

2. **Check Firestore Rules:**
   - Do rules allow admin to read `customers` collection?

3. **Check Browser Console:**
   - Any Firebase errors?
   - Permission denied errors?
   - Connection errors?

4. **Verify Customer Document:**
   - In correct `customers` collection?
   - Document ID is user's auth UID?
   - All fields present?

---

**Status:** Awaiting Firebase config verification
**Next Step:** Check admin dashboard firebase.js projectId
**Expected Resolution Time:** 5 minutes after config update
