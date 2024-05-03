// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzyDZwPoYnghaDZ85TsFWrcrgV2J1HfQo",
  authDomain: "dannycord-48053.firebaseapp.com",
  projectId: "dannycord-48053",
  storageBucket: "dannycord-48053.appspot.com",
  messagingSenderId: "358545549865",
  appId: "1:358545549865:web:0910656871872e7116ca38",
  measurementId: "G-9DC1XEVCD8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
