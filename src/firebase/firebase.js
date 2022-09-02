// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqPSQiStSUiQJGxIls6w0lQ7aQ7F8dY0Q",
  authDomain: "bill-splitter-795ac.firebaseapp.com",
  databaseURL: "https://bill-splitter-795ac-default-rtdb.firebaseio.com",
  projectId: "bill-splitter-795ac",
  storageBucket: "bill-splitter-795ac.appspot.com",
  messagingSenderId: "22725838860",
  appId: "1:22725838860:web:7acccc286b28b8df384629",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
