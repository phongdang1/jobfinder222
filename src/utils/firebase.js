// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAODjfIXcHNI1XXrizYkXJHSWRT-9YLSRQ",
  authDomain: "job-finder-2f7e1.firebaseapp.com",
  projectId: "job-finder-2f7e1",
  storageBucket: "job-finder-2f7e1.appspot.com",
  messagingSenderId: "555418223883",
  appId: "1:555418223883:web:3ad231b6163c26ef8a8e0e",
  measurementId: "G-1VTZJF6RP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);