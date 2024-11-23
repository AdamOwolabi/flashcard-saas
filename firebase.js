// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXNCumz-8R7IFQDtDKRvIzY71miGjaLpA",
  authDomain: "flashcard-saas-c8371.firebaseapp.com",
  projectId: "flashcard-saas-c8371",
  storageBucket: "flashcard-saas-c8371.appspot.com",
  messagingSenderId: "835393844551",
  appId: "1:835393844551:web:3d3e1fd123037c12330862",
  measurementId: "G-WY3CXW8S3K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Conditionally initialize Analytics (only on the client-side)

  const analytics = getAnalytics(app); // Only initialize analytics if supported and on client-side
  
export{db}