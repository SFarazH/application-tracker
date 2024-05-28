import React from "react";
import { useAuth } from "../components/AuthContext";

const Dashboard = () => {
  const { authUser, isLoading } = useAuth();
  return <div>{authUser.name}</div>;
};

export default Dashboard;
