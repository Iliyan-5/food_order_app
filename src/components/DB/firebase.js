// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Import other Firebase services as needed

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export {db, firebaseApp};