const admin = require('firebase-admin');
const axios = require('axios');
require('dotenv').config();
const serviceAccount = require('./keys/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const services = db.collection('services');

async function checkService(serviceName) {
  let serviceStatus = false;
  try {
    await axios.get(serviceName);
    serviceStatus = true;
  } catch (error) {
    serviceStatus = false;
  }
  return serviceStatus;
}

async function checkServices() {
  const [stocksStatus, currencyStatus, newsStatus] = await Promise.all([
    checkService(process.env.STOCKS_URL),
    checkService(process.env.CURRENCY_URL),
    checkService(process.env.NEWS_URL),
  ]);

  services.doc(process.env.AVAILABLE_SERVICES_NAME).set({
    stocks: stocksStatus,
    currency: currencyStatus,
    news: newsStatus,
  });
}

async function getServices(documentName) {
  const servicesList = [];

  await services
    .doc(documentName)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        servicesList.push(doc.data());
      }
    })
    .catch((err) => {
      console.log('Error getting document', err);
    });
  return servicesList;
}

module.exports = {
  checkService,
  checkServices,
  getServices,
};
