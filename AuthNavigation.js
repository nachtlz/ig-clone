import React from "react";
import { SignedInStack, SignedOutStack } from "./navigation";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from "react";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);
    
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => userHandler(user));
  }, []);
  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
