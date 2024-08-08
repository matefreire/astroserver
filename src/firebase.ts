// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLhrogrf9Qd9Ntrm3-yNE-yR-pQYI_P04",
  authDomain: "astromaniaka.firebaseapp.com",
  databaseURL: "https://astromaniaka-default-rtdb.firebaseio.com",
  projectId: "astromaniaka",
  storageBucket: "astromaniaka.appspot.com",
  messagingSenderId: "315989182078",
  appId: "1:315989182078:web:e778ec78b7494bc452fa2f",
  measurementId: "G-CCGF6TBG98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
