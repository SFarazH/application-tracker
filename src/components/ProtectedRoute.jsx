import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading } = useAuth();
//   console.log("ProtectedRoute - isLoading:", isLoading);
//   console.log("ProtectedRoute - authUser:", authUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
