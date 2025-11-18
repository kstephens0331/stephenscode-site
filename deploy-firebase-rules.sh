#!/bin/bash

echo "Firebase Security Rules Deployment Script"
echo "=========================================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null
then
    echo "Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

echo "This script will deploy Firestore security rules to your Firebase projects."
echo ""
echo "You'll need to:"
echo "1. Login to Firebase (if not already logged in)"
echo "2. Deploy rules to customer-stephenscode project"
echo "3. Deploy rules to stephenscode-12f75 project"
echo ""

# Login to Firebase
echo "Step 1: Logging in to Firebase..."
firebase login

echo ""
echo "Step 2: Deploying rules to customer-stephenscode project..."
echo "Please select the 'customer-stephenscode' project when prompted."
firebase use --add

# Deploy customer database rules
firebase deploy --only firestore:rules --project customer-stephenscode

echo ""
echo "Step 3: Deploying rules to stephenscode-12f75 project (orders)..."
echo "Please select the 'stephenscode-12f75' project when prompted."

# You'll need to manually switch the rules file or use firebase.json
cp firestore-orders.rules firestore.rules
firebase deploy --only firestore:rules --project stephenscode-12f75

echo ""
echo "✅ Firebase security rules deployed successfully!"
echo ""
echo "Your admin dashboard should now be able to:"
echo "- View customer list"
echo "- Link orders to customers"
echo "- Access all customer data"
