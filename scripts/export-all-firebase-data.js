/**
 * Export all Firebase data from BOTH projects
 * - customer-stephenscode (customer portal)
 * - admin-dashboard-stephenscode (admin dashboard)
 *
 * Prerequisites:
 * - Download service account keys for BOTH projects
 * - Place them as:
 *   - serviceAccountKey-customer.json (for customer-stephenscode)
 *   - serviceAccountKey-admin.json (for admin-dashboard-stephenscode)
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Output directory
const outputDir = path.join(__dirname, '../migration-data');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Convert Firebase Timestamps to ISO strings recursively
 */
function convertTimestamps(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (obj.toDate && typeof obj.toDate === 'function') {
    return obj.toDate().toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(convertTimestamps);
  }

  const converted = {};
  for (const [key, value] of Object.entries(obj)) {
    converted[key] = convertTimestamps(value);
  }
  return converted;
}

/**
 * Export a Firestore collection
 */
async function exportCollection(db, collectionName, projectName) {
  try {
    console.log(`\n📦 Exporting ${collectionName} from ${projectName}...`);
    const snapshot = await db.collection(collectionName).get();

    const data = [];
    snapshot.forEach(doc => {
      const docData = doc.data();
      const converted = convertTimestamps(docData);
      data.push({
        id: doc.id,
        ...converted
      });
    });

    // Save to JSON
    const filename = `${projectName}_${collectionName}.json`;
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log(`✅ Exported ${data.length} documents from ${collectionName}`);
    return { collection: collectionName, count: data.length };
  } catch (error) {
    console.error(`❌ Error exporting ${collectionName}:`, error.message);
    return { collection: collectionName, count: 0, error: error.message };
  }
}

/**
 * Export Firebase Auth users
 */
async function exportAuthUsers(auth, projectName) {
  try {
    console.log(`\n👥 Exporting Auth users from ${projectName}...`);
    const listUsersResult = await auth.listUsers();

    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      disabled: user.disabled,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime
      },
      providerData: user.providerData
    }));

    const filename = `${projectName}_auth_users.json`;
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, JSON.stringify(users, null, 2));

    console.log(`✅ Exported ${users.length} auth users`);
    return { count: users.length };
  } catch (error) {
    console.error(`❌ Error exporting auth users:`, error.message);
    return { count: 0, error: error.message };
  }
}

/**
 * Export from a single project
 */
async function exportProject(serviceAccountPath, projectName, collections) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 Starting export from: ${projectName}`);
  console.log(`${'='.repeat(60)}`);

  // Check if service account file exists
  if (!fs.existsSync(serviceAccountPath)) {
    console.error(`❌ Service account file not found: ${serviceAccountPath}`);
    console.log(`\nTo get this file:`);
    console.log(`1. Go to Firebase Console → ${projectName}`);
    console.log(`2. Project Settings → Service Accounts`);
    console.log(`3. Click "Generate New Private Key"`);
    console.log(`4. Save as: ${path.basename(serviceAccountPath)}`);
    return null;
  }

  // Initialize Firebase Admin for this project
  const serviceAccount = require(serviceAccountPath);
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${projectName}.firebaseio.com`
  }, projectName); // Use project name as app name

  const db = admin.firestore(app);
  const auth = admin.auth(app);

  const results = {
    project: projectName,
    collections: [],
    auth: null
  };

  // Export all collections
  for (const collection of collections) {
    const result = await exportCollection(db, collection, projectName);
    results.collections.push(result);
  }

  // Export auth users
  results.auth = await exportAuthUsers(auth, projectName);

  // Delete the app instance
  await admin.app(projectName).delete();

  return results;
}

/**
 * Main export function
 */
async function exportAllData() {
  console.log('\n🎯 Firebase to Supabase Migration - Data Export');
  console.log('================================================\n');

  const summary = {
    exportDate: new Date().toISOString(),
    projects: []
  };

  // Collections to export from each project
  const collections = [
    'customers',
    'orders',
    'updateRequests',
    'moduleRequests',
    'privateFeedback',
    'creditTransactions',
    'products'
  ];

  // Export from customer portal project
  const customerResults = await exportProject(
    path.join(__dirname, '../serviceAccountKey-customer.json'),
    'customer-stephenscode',
    collections
  );
  if (customerResults) {
    summary.projects.push(customerResults);
  }

  // Export from admin dashboard project
  const adminResults = await exportProject(
    path.join(__dirname, '../serviceAccountKey-admin.json'),
    'admin-dashboard-stephenscode',
    collections
  );
  if (adminResults) {
    summary.projects.push(adminResults);
  }

  // Save summary
  const summaryPath = path.join(outputDir, '_export-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log('✅ Export Complete!');
  console.log('='.repeat(60));
  console.log(`\n📁 Data saved to: ${outputDir}`);
  console.log(`📊 Summary saved to: ${summaryPath}\n`);

  // Print summary
  for (const project of summary.projects) {
    console.log(`\n📦 ${project.project}:`);
    console.log(`   Auth Users: ${project.auth?.count || 0}`);
    for (const col of project.collections) {
      if (col.error) {
        console.log(`   ❌ ${col.collection}: ${col.error}`);
      } else {
        console.log(`   ✅ ${col.collection}: ${col.count} documents`);
      }
    }
  }

  console.log('\n🎉 Ready for Supabase import!\n');
}

// Run the export
exportAllData().catch(error => {
  console.error('\n❌ Export failed:', error);
  process.exit(1);
});
