import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAH4GNL8zzRnSmPEVYokn8RTiKVLPQiDWo",
  authDomain: "react-taller-4b6e7.firebaseapp.com",
  projectId: "react-taller-4b6e7",
  storageBucket: "react-taller-4b6e7.appspot.com",
  messagingSenderId: "338627266238",
  appId: "1:338627266238:web:86a30ca5ad6059464800ef",
  measurementId: "G-CGMW9SKSDK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase }