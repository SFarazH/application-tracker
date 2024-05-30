import React, { useState } from "react";
import Tabs from "./Tabs";
import Login from "./Login";
import Register from "./Register";

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Login", component: <Login setActiveTab={setActiveTab} /> },
    { title: "Register", component: <Register setActiveTab={setActiveTab} /> },
  ];
  return (
    <>
      <div className="block justify-between md:flex">
        <div>welcome</div>
        <div className="md:w-1/3">
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </>
  );
};

export default Home;
