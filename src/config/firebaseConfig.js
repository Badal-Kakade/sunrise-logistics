import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCa1nPgebPX0d96o7GBVAa1B2GAXifg-M",
  authDomain: "employee-management-50764.firebaseapp.com",
  databaseURL: "https://employee-management-50764-default-rtdb.firebaseio.com",
  projectId: "employee-management-50764",
  storageBucket: "employee-management-50764.firebasestorage.app",
  messagingSenderId: "596882232853",
  appId: "1:596882232853:web:3d1cbc45d96c4277d5601c",
  measurementId: "G-CY3YSMR25V"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
