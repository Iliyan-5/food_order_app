// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Import other Firebase services as needed
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2M80goKbJwZQZgBeaC_98YwTAvVOyjpI",
  authDomain: "food-order-app-7d66e.firebaseapp.com",
  databaseURL: "https://food-order-app-7d66e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "food-order-app-7d66e",
  storageBucket: "food-order-app-7d66e.appspot.com",
  messagingSenderId: "458723723378",
  appId: "1:458723723378:web:49c7cef1bb484c885c1aeb",
  measurementId: "G-Z0JQFTD3C7"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const auth = getAuth(firebaseApp);

export {db, firebaseApp, auth};