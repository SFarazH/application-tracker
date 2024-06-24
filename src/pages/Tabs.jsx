import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="">
      <div className="flex border-gray-200 mx-4 pt-4 gap-4 mclaren">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 p-4 py-2 text-center transition duration-300 text-2xl font-medium rounded-full focus:outline-none ${
              activeTab === index
                ? " bg-[#02182B] text-white rounded-full"
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
