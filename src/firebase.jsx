import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 1. Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqGS3awcCd389CeO1YIZsBb6Kb1Mn6ymg",
  authDomain: "nexgencred.firebaseapp.com",
  projectId: "nexgencred",
  storageBucket: "nexgencred.appspot.com",
  messagingSenderId: "470957603914",
  appId: "1:470957603914:web:02dc759df6c90be7197ab3",
  measurementId: "G-LCQFSHDGPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// 2. Initialize Firestore and export it
export const db = getFirestore(app);

export default app;