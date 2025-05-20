// scripts/uploadProducts.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, writeBatch } = require('firebase/firestore');
require('dotenv').config();

// Load JSON data
const products = require('./products.json'); // Adjust path if needed

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
    const batch = writeBatch(db);
    for (const product of products) {
      if (!product.id || !product.name || !product.price) {
        console.warn(`Skipping invalid product: ID ${product.id || 'unknown'}`);
        continue;
      }
      const docRef = doc(collection(db, 'products'), product.id.toString());
      batch.set(docRef, product);
    }
    await batch.commit();
    console.log(`Successfully uploaded ${products.length} products`);
  } catch (error) {
    console.error('Error uploading products:', error);
  }
}

uploadProducts();
