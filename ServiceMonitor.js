const admin = require('firebase-admin');
const axios = require('axios');
const express = require('express');

const app = express();
require('dotenv').config();
const serviceAccount = require('./keys/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const services = db.collection('services');

async function checkServices() {
  let stocksStatus = false;
  let currencyStatus = false;
  let newsStatus = false;

  try {
    await axios.get(process.env.STOCKS_URL);
    stocksStatus = true;
  } catch (error) {
    stocksStatus = false;
  }
  try {
    await axios.get(process.env.CURRENCY_URL);
    currencyStatus = true;
  } catch (error) {
    currencyStatus = false;
  }
  try {
    await axios.get(process.env.NEWS_URL);
    newsStatus = true;
  } catch (error) {
    newsStatus = false;
  }
  services.doc(process.env.AVAILABLE_SERVICES_NAME).set({
    stocks: stocksStatus,
    currency: currencyStatus,
    news: newsStatus,
  });
}

setInterval(checkServices, process.env.TIMER);

app.get('/heartbeat', (req, res) => {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => console.log(`Currency service running on port ${port}!`));
