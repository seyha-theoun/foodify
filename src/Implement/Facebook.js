// src/Implement/Facebook.js
import { useState } from "react";
import {
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../fireBase/firebase-config";

const provider = new FacebookAuthProvider();

export const useLoginWithFacebook = () => {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const login = async () => {
    setIsPending(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error(err);
    }
    setIsPending(false);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { login, logout, user, isPending };
};
