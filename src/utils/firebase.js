// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUDmiAdFVmpNoJsawF3CoKd0D3n_TAPBA",
  authDomain: "netflixgpt-607ca.firebaseapp.com",
  projectId: "netflixgpt-607ca",
  storageBucket: "netflixgpt-607ca.appspot.com",
  messagingSenderId: "512455232634",
  appId: "1:512455232634:web:8f292719f9f35fdd18ffc3",
  measurementId: "G-VK1BJ0BDS5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
