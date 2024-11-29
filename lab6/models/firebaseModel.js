const admin = require("firebase-admin");

// Firebase Admin SDK service account credentials
const serviceAccount = require("../firebaseConfig.json");

// Initialize Firebase Admin SDK
if (!admin.apps.length) { // Prevent reinitialization
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-app-40659-default-rtdb.firebaseio.com",
  });
}

// Export the initialized admin object
module.exports = admin;
