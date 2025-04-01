// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Configuration Firebase - remplacez ces valeurs par celles de votre projet
const firebaseConfig = {
  apiKey: "AIzaSyCxKRExmdLUsV7Qeq36BAx2Q4ppD3Akq10",
  authDomain: "coach-grossesse-new.firebaseapp.com",
  projectId: "coach-grossesse-new",
  storageBucket: "coach-grossesse-new.firebasestorage.app",
  messagingSenderId: "15634382127",
  appId: "1:15634382127:web:f937a56ab9f609c63ff5da",
  measurementId: "G-YYFZ0SGD5V"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

export default app;