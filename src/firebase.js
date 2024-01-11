// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChjxvZqkmWltyK5BoNmetD34w22MImPdA",
  authDomain: "blog-application-23b20.firebaseapp.com",
  projectId: "blog-application-23b20",
  storageBucket: "blog-application-23b20.appspot.com",
  messagingSenderId: "758385028014",
  appId: "1:758385028014:web:b1f61cf0488281cbf5763f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()

