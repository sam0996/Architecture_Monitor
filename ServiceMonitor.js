const admin = require('firebase-admin');

const serviceAccount = require('./keys/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const services = db.collection('services');
const getAvailableService = services.doc('available_services');
getAvailableService
  .get()
  .then((doc) => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch((err) => {
    console.log('Error getting document', err);
  });
