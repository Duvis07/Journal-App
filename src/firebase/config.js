// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOQpd_40EKER5yxIVEImLJyuqdNuzba2U",
  authDomain: "reactjs-8462b.firebaseapp.com",
  projectId: "reactjs-8462b",
  storageBucket: "reactjs-8462b.appspot.com",
  messagingSenderId: "157908594929",
  appId: "1:157908594929:web:d20c747c6fcfefe1bcf950",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(firebaseApp);

export const FirebaseFirestore = getFirestore(firebaseApp);

