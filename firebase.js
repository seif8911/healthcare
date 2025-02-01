// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv_UFd-486l7V_er4QEAmq9itrf_q9V-k",
  authDomain: "alert-vim-344418.firebaseapp.com",
  projectId: "alert-vim-344418",
  storageBucket: "alert-vim-344418.firebasestorage.app",
  messagingSenderId: "138830808551",
  appId: "1:138830808551:web:662adb6eb6f6ed48f3a942",
  measurementId: "G-KGK71QFF7Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// const analytics = getAnalytics(app);

module.exports = {db}
