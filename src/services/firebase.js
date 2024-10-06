// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyADMpEPulIni-1QEZpoULlT3LzFPAvckao',
  authDomain: 'parcial-1-lfs.firebaseapp.com',
  projectId: 'parcial-1-lfs',
  storageBucket: 'parcial-1-lfs.appspot.com',
  messagingSenderId: '711080151934',
  appId: '1:711080151934:web:dd9c5e238b74eb5945c12f',
  measurementId: 'G-J9YCFK23SN',
};

// Initialize Firebase
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
