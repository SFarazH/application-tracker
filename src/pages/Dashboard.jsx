import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import Applications from "../components/Applications";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import Resume from "../components/Resume";
import Tabs from "./Tabs";

const Dashboard = () => {
  const { authUser, isLoading } = useAuth();
  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, 1500);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Applications",
      component: <Applications setActiveTab={setActiveTab} />,
    },
    { title: "Resume", component: <Resume setActiveTab={setActiveTab} /> },
  ];
  return (
    <div>
      {loader ? (
        <h2>wait</h2>
      ) : (
        <>
          <Navbar />
          <div className="lg:flex min-h-screen">
            <div className="lg:w-2/3">
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <div className="lg:w-1/3  ">
              <Notes />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
