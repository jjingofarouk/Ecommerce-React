// scripts/uploadProducts.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
require('dotenv').config();

// Load your JSON data
const products = require('./products.json'); // Path to your JSON file

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadProducts() {
  try {
    for (const product of products) {
      await setDoc(doc(collection(db, 'products'), product.id.toString()), product);
      console.log(`Uploaded: ${product.name}`);
    }
    console.log('All products uploaded successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

uploadProducts();