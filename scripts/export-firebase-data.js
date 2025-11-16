const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
// TODO: Update this path to your actual service account key
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function exportCollection(collectionName) {
  console.log(`\n📦 Exporting ${collectionName}...`);

  try {
    const snapshot = await db.collection(collectionName).get();

    const data = [];
    snapshot.forEach(doc => {
      const docData = doc.data();

      // Convert Firestore Timestamps to ISO strings
      const converted = {};
      for (const [key, value] of Object.entries(docData)) {
        if (value && value.toDate && typeof value.toDate === 'function') {
          // Firestore Timestamp
          converted[key] = value.toDate().toISOString();
        } else if (value && typeof value === 'object' && !Array.isArray(value)) {
          // Nested object - recursively convert timestamps
          converted[key] = convertTimestampsInObject(value);
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
  } catch (error) {
    console.error(`❌ Error exporting ${collectionName}:`, error.message);
    return [];
  }
}

function convertTimestampsInObject(obj) {
  const converted = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value && value.toDate && typeof value.toDate === 'function') {
      converted[key] = value.toDate().toISOString();
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      converted[key] = convertTimestampsInObject(value);
    } else {
      converted[key] = value;
    }
  }
  return converted;
}

async function exportAllData() {
  console.log('🚀 Starting Firebase data export...\n');
  console.log('Project:', admin.app().options.projectId);

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
  console.log('\n👤 Exporting Auth users...');
  try {
    let allUsers = [];
    let nextPageToken;

    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);

      const users = listUsersResult.users.map(user => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        disabled: user.disabled,
        metadata: {
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime
        },
        providerData: user.providerData
      }));

      allUsers = allUsers.concat(users);
      nextPageToken = listUsersResult.pageToken;

      console.log(`  Fetched ${allUsers.length} users...`);
    } while (nextPageToken);

    fs.writeFileSync(
      path.join(__dirname, '../migration-data/auth-users.json'),
      JSON.stringify(allUsers, null, 2)
    );
    console.log(`✅ Exported ${allUsers.length} auth users`);

    // Summary
    console.log('\n📊 Export Summary:');
    console.log('═══════════════════════════════════════');
    for (const [collection, data] of Object.entries(allData)) {
      console.log(`  ${collection.padEnd(25)} ${data.length} documents`);
    }
    console.log(`  ${'auth-users'.padEnd(25)} ${allUsers.length} users`);
    console.log('═══════════════════════════════════════');

    const totalDocs = Object.values(allData).reduce((sum, data) => sum + data.length, 0);
    console.log(`  ${'TOTAL'.padEnd(25)} ${totalDocs + allUsers.length} records\n`);

    // Create summary file
    const summary = {
      exportDate: new Date().toISOString(),
      projectId: admin.app().options.projectId,
      collections: Object.entries(allData).map(([name, data]) => ({
        name,
        count: data.length
      })),
      authUsers: allUsers.length,
      total: totalDocs + allUsers.length
    };

    fs.writeFileSync(
      path.join(__dirname, '../migration-data/_export-summary.json'),
      JSON.stringify(summary, null, 2)
    );

  } catch (error) {
    console.error('❌ Error exporting auth users:', error.message);
  }
}

// Run export
exportAllData()
  .then(() => {
    console.log('✅ Export complete!');
    console.log('📁 Data saved to: migration-data/\n');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Export failed:', error);
    process.exit(1);
  });
