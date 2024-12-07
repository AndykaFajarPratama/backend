const admin = require('firebase-admin');

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID
};

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();

async function storePrediction(predictionData) {
    const predictionsRef = db.collection('predictions');
    await predictionsRef.doc(predictionData.id).set(predictionData);
}

module.exports = { storePrediction };
