// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"


import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyByHtkcbpwLTunk1gdp8mKLFxem2wFzh20",
  authDomain: "invoice-app-6355f.firebaseapp.com",
  projectId: "invoice-app-6355f",
  storageBucket: "invoice-app-6355f.appspot.com",
  messagingSenderId: "890093097314",
  appId: "1:890093097314:web:7f3bdce3439ccaaf625c3b"
};

// const db = getFirestore();
// export default db;


firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
  
export default db;