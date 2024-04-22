// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "blogapp-96ddf.firebaseapp.com",
  projectId: "blogapp-96ddf",
  storageBucket: "blogapp-96ddf.appspot.com",
  messagingSenderId: "1032000717202",
  appId: "1:1032000717202:web:3180270d780a3a1edb814b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);