const admin = require("firebase-admin");
const path = require("path");

const databaseKeyPath = path.resolve(__dirname, "../utils/databaseKey.json");
admin.initializeApp({
  credential: admin.credential.cert(require(databaseKeyPath)),
});
const db = admin.firestore();

const savePrediction = async (id, data) => {
  await db.collection("predictions").doc(id).set(data);
};

const getPredictionHistories = async () => {
  const snapshot = await db.collection("predictions").get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

module.exports = { savePrediction, getPredictionHistories };
    
