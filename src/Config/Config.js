import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBWYCzUa-K0i_ErBYnl1OsfoW8DvyP-ggQ",
    authDomain: "ecommerce-app-cc5ac.firebaseapp.com", 
    projectId: "ecommerce-app-cc5ac",
    storageBucket: "ecommerce-app-cc5ac.appspot.com",
    messagingSenderId: "939809921574",
    appId: "1:939809921574:web:279b41345d04753b16a4e7",
    measurementId: "G-M0PBPYDXJW"
  };

  firebase.initializeApp(firebaseConfig);

  const auth=firebase.auth();
  const fs =firebase.firestore();
  const storage = firebase.storage();

  export {auth,fs,storage}