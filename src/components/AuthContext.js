import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [temp, setTemp] = useState(0);
  
  const verifyUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/auth/verify", {
        withCredentials: true,
      });
      console.log("verifyUser - response:", response.data);
      setAuthUser(response.data);
    } catch (error) {
      console.error("verifyUser - error:", error);
      setAuthUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    verifyUser();
  }, [temp]);



  const value = {
    authUser,
    setAuthUser,
    isLoading,
    verifyUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
