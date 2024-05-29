import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import Applications from "../components/Applications";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";

const Dashboard = () => {
  const { authUser, isLoading } = useAuth();
  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, 3000);
  return (
    <div>
      {loader ? (
        <h2>wait</h2>
      ) : (
        <>
          <Navbar />
          {authUser.name}
          <div className="flex">
            <div className="w-2/3">
              <Applications />
            </div>
            <div className="w-1/3">
              <Notes />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
