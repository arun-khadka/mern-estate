// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-72062.firebaseapp.com",
  projectId: "mern-estate-72062",
  storageBucket: "mern-estate-72062.appspot.com",
  messagingSenderId: "1072508752426",
  appId: "1:1072508752426:web:0796dc7393db6655eae953",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
