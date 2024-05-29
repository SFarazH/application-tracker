import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Login", component: <Login setActiveTab={setActiveTab} /> },
    { title: "Register", component: <Register setActiveTab={setActiveTab} /> },
  ];

  return (
    <div className="mx-8 mt-10 md:w-1/3">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 py-2 text-center transition duration-300 ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="py-4">{tabs[activeTab].component}</div>
    </div>
  );
};

export default Tabs;
