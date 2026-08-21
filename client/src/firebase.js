// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "campusvault-e6d9a.firebaseapp.com",
  projectId: "campusvault-e6d9a",
  storageBucket: "campusvault-e6d9a.firebasestorage.app",
  messagingSenderId: "315476629637",
  appId: "1:315476629637:web:2e78bce72599e51d3c71ec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

