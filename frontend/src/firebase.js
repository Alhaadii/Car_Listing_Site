// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-listing-site-21690.firebaseapp.com",
  projectId: "car-listing-site-21690",
  storageBucket: "car-listing-site-21690.firebasestorage.app",
  messagingSenderId: "205950076342",
  appId: "1:205950076342:web:9e2db4bf98ac893e35ed17"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);