const admin = require('firebase-admin');

var serviceAccount = require('./keys/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();


var services = db.collection('services');
var getAvailableService = services.doc('available_services')
getAvailableService.get()
.then(doc => {
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
    }
})
.catch(err => {
    console.log('Error getting document', err);
});