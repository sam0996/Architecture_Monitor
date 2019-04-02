const admin = require('firebase-admin');
const axios = require('axios');
require('dotenv').config();
const serviceAccount = require('./keys/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const services = db.collection('services');

async function checkServices() {
  const stocks = false;
  const currency = false;
  const news = false;

  try {
    const result = await axios.get(process.env.STOCKS_URL);
    console.log(result.status);
    stocks = true;
  } catch (error) {
    console.log(error.response.status);
    stocks = false;
  }
  try {
    const result = await axios.get(process.env.STOCKS_URL);
    console.log(result.status);
    stocks = true;
  } catch (error) {
    console.log(error.response.status);
    stocks = false;
  }
  try {
    const result = await axios.get(process.env.STOCKS_URL);
    console.log(result.status);
    stocks = true;
  } catch (error) {
    console.log(error.response.status);
    stocks = false;
  }
}

setInterval(() => checkServices(services), process.env.TIMER);
