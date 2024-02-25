import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGxrXrH9TZRb2A3zq4RXFGM06agoyMHbo",
  authDomain: "rn-instagram-clone-practise.firebaseapp.com",
  projectId: "rn-instagram-clone-practise",
  storageBucket: "rn-instagram-clone-practise.appspot.com",
  messagingSenderId: "828763370240",
  appId: "1:828763370240:web:5c3b1026bc2b633d9b79e5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
