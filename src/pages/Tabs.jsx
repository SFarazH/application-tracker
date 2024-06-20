import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="">
      <div className="flex border-gray-200 mx-8 pt-3 gap-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 p-4 py-2 text-center transition duration-300 text-xl font-semibold rounded-full focus:outline-none  ${
              activeTab === index
                ? " bg-indigo-950 text-white rounded-full"
                : "bg-transparent"
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
