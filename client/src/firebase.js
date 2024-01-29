// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-970b4.firebaseapp.com",
  projectId: "mern-blog-970b4",
  storageBucket: "mern-blog-970b4.appspot.com",
  messagingSenderId: "979614449289",
  appId: "1:979614449289:web:b4aecc3e0ef8b7b5975058"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);