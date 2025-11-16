# Firebase Security Rules Fix

## Issue
The admin dashboard is getting a "Missing or insufficient permissions" error when trying to read customer data from the `customer-stephenscode` Firebase project.

## Solution
You need to update the Firestore Security Rules in the Firebase Console to allow read access to the customers collection.

## Steps to Fix

### 1. Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select the **customer-stephenscode** project

### 2. Update Firestore Rules
1. In the left sidebar, click on **Firestore Database**
2. Click on the **Rules** tab
3. Update the rules to allow read access for the customers collection

### 3. Recommended Security Rules

Replace your current rules with these:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Customers collection - Allow read from admin, write for authenticated users
    match /customers/{customerId} {
      // Allow users to read/write their own customer document
      allow read, write: if request.auth != null && request.auth.uid == customerId;

      // Allow read access for admin dashboard (you can add admin-specific auth check here)
      allow read: if request.auth != null;
    }

    // Update Requests - Allow authenticated users to create, allow all to read
    match /updateRequests/{requestId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }

    // Module Requests - Allow authenticated users to create, allow all to read
    match /moduleRequests/{requestId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }

    // Private Feedback - Allow authenticated users to create, allow all to read
    match /privateFeedback/{feedbackId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
}
```

### 4. For Orders Database (stephenscode-12f75)

Also update the rules for the orders database:

1. Select the **stephenscode-12f75** project in Firebase Console
2. Go to **Firestore Database** > **Rules**
3. Use these rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Orders collection
    match /orders/{orderId} {
      // Allow admin dashboard to read and write all orders
      allow read, write: if request.auth != null;

      // Alternatively, for more security, check if user is admin:
      // allow read, write: if request.auth != null &&
      //   get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

### 5. Publish Changes
Click **Publish** to apply the new rules.

## What This Fixes

1. **Admin Dashboard Customers Page** - Will now be able to fetch and display customer list
2. **Admin Dashboard Add Order** - Customer auto-complete will work
3. **Customer Registration** - Will automatically link existing orders when customers register
4. **Manual Re-linking** - Admin can manually re-link orders to customers using the "Re-link" button

## Features Implemented

### Automatic Order Linking on Registration
When a customer creates an account:
- The system searches for all orders with matching email address
- Automatically links them to the new customer account
- Shows a message: "We found and linked X existing orders to your account"

### Manual Order Re-linking (Admin Dashboard)
Admins can manually re-link orders:
1. Go to Customers page
2. Click "Re-link" button for any customer
3. System finds all orders with that customer's email
4. Links them to the customer account
5. Shows success message with count of linked orders

### Order Linking Fields
When orders are linked, they include:
- `customerId` - The Firebase UID of the customer
- `customerName` - Full name from customer profile
- `linkedAccount` - Boolean flag (true when linked)
- `linkedAt` - Timestamp of when the link was created

## Testing

After updating the rules:

1. **Test Customer List**: Go to admin dashboard > Customers
   - Should see customer list without permission errors

2. **Test Add Order**: Go to Orders > Add Order
   - Start typing email in customer field
   - Should see customer suggestions dropdown

3. **Test Registration**: Create a new test customer account
   - If there are orders with that email, should see link confirmation

4. **Test Manual Re-link**: In Customers page
   - Click "Re-link" button for a customer
   - Should see success message with linked order count

## Security Notes

The rules above allow any authenticated user to read customers. For production, you may want to:

1. Create an `admins` collection to track admin users
2. Check if `request.auth.uid` exists in the admins collection
3. Only allow admin users to read/write customer data

Example stricter rule:
```javascript
match /customers/{customerId} {
  allow read, write: if request.auth != null &&
    exists(/databases/$(database)/documents/admins/$(request.auth.uid));
}
```
