import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfeUf56zdhPtsV0QkVqjd_WBP5OuFLQBA",
  authDomain: "stephenscode-12f75.firebaseapp.com",
  projectId: "stephenscode-12f75",
  storageBucket: "stephenscode-12f75.firebasestorage.app",
  messagingSenderId: "960805602405",
  appId: "1:960805602405:web:6d5fa556d89ca2ccabb28c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 