// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFb4a4js6IgLU7TOBqTtKP-WIjqtPvwMY",
  authDomain: "ursac-361323.firebaseapp.com",
  projectId: "ursac-361323",
  storageBucket: "ursac-361323.appspot.com",
  messagingSenderId: "658460380540",
  appId: "1:658460380540:web:b53ecf1263c166e204a8f9",
  measurementId: "G-1D1FF0K0CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)