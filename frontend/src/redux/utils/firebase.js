// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYvq0dhTRQdLsjLqavyivrVYjgu5S154g",
    authDomain: "kupafoods.firebaseapp.com",
    projectId: "kupafoods",
    storageBucket: "kupafoods.appspot.com",
    messagingSenderId: "86234935918",
    appId: "1:86234935918:web:70d7e3effdd0a4e8a3ec7f",
    measurementId: "G-BKV0S5EBVY"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();
export { auth, storage, googleProvider };