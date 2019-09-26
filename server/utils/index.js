const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-line-a28d2.firebaseio.com"
});
var db = admin.firestore();

module.exports = {
  db
};
