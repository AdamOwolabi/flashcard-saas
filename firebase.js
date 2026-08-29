import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCXNCumz-8R7IFQDtDKRvIzY71miGjaLpA",
  authDomain: "flashcard-saas-c8371.firebaseapp.com",
  projectId: "flashcard-saas-c8371",
  storageBucket: "flashcard-saas-c8371.firebasestorage.app",
  messagingSenderId: "835393844551",
  appId: "1:835393844551:web:3d3e1fd123037c12330862",
  measurementId: "G-WY3CXW8S3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export{db}
