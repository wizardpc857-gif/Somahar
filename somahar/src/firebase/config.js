// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbEZQHIGvAmEqAu7eGCOcSLSGbUElWPEQ",
  authDomain: "somahar-82288.firebaseapp.com",
  projectId: "somahar-82288",
  storageBucket: "somahar-82288.firebasestorage.app",
  messagingSenderId: "602165335574",
  appId: "1:602165335574:web:af178c6a065fdedcad4737",
  measurementId: "G-5SL33RVGDZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
