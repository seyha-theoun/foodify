// src/Firebase/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();

// ✅ Only import analytics if needed in production
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAKIf4ldz4d_F8yD7tqGMGNsdBKWfcnOTA",
  authDomain: "testauth-1f758.firebaseapp.com",
  projectId: "testauth-1f758",
  storageBucket: "testauth-1f758.appspot.com",
  messagingSenderId: "111263712725",
  appId: "1:111263712725:web:6ea1ac0be4e88c2a82695c",
  measurementId: "G-L2KQJNZ24K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Optional

// ✅ Export Auth instance to use in your login/signup logic
export const auth = getAuth(app);
