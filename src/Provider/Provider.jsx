import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import auth from "../Firebase/Firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();


const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createNewUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password)
  }

  const logIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
  }

  const logOut = () => {
      setLoading(true);
      return signOut(auth);
  }

// Update User Profile (Name, Phone, Photo URL)
const updateUserProfile = async (name, phone, photoURL) => {
  if (!user) return;

  setLoading(true);
  try {
    await updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    });

    // Update state with new user info
    setUser({ ...user, displayName: name, phoneNumber: phone, photoURL });

    console.log("User profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser);
          if (currentUser) {
              const userInfo = { email: currentUser.email };
              axiosPublic.post('/jwt', userInfo)
                  .then(res => {
                      if (res.data.token) {
                          localStorage.setItem('access-token', res.data.token);
                          // console.log("res.data.token", res.data.token);
                          setLoading(false);
                      }
                  })
          }
          else {
              localStorage.removeItem('access-token');
              setLoading(false);
          }
          
      });
      return () => {
          return unsubscribe();
      }
  }, [axiosPublic])

  const authInfo = {
      user,
      loading,
      createNewUser,
      logIn,
      signInWithGoogle,
      logOut,
      updateProfile,
  }

  return (
      <AuthContext.Provider value={authInfo}>
          {children}
      </AuthContext.Provider>
  );
};

export default Provider;