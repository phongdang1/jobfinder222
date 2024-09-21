import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAODjfIXcHNI1XXrizYkXJHSWRT-9YLSRQ",
  authDomain: "job-finder-2f7e1.firebaseapp.com",
  projectId: "job-finder-2f7e1",
  storageBucket: "job-finder-2f7e1.appspot.com",
  messagingSenderId: "555418223883",
  appId: "1:555418223883:web:3ad231b6163c26ef8a8e0e",
  measurementId: "G-1VTZJF6RP2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
