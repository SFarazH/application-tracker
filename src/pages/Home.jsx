import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import Login from "./Login";
import Register from "./Register";
import app1 from "../assets/applicationsg.svg";

import app3 from "../assets/filesg.svg";
import app4 from "../assets/folderm.svg";
const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const images = [app1, app3, app4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const tabs = [
    { title: "Login", component: <Login setActiveTab={setActiveTab} /> },
    { title: "Register", component: <Register setActiveTab={setActiveTab} /> },
  ];

  useEffect(() => {
    const changeImage = () => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true);
      }, 500);
    };
    const intervalId = setInterval(changeImage, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="block justify-between md:flex pt-4 md:pt-12 px-4 md:px-8">
        <div>
          <p className="text-6xl md:text-8xl font-thin luckiest flex flex-wrap text-center">
            Application Tracker
          </p>
          <p className="covered text-3xl md:text-[2.8em] mt-4 md:mt-8 text-green-500 text-center">
            One stop portal to manage all your job applications!{" "}
          </p>
          <div className="flex justify-center mt-4 md:mt-20 mb-12 items-center">
            <img
              src={images[currentIndex]}
              alt=""
              className={`transition-opacity h-72 ease-in-out duration-500 ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
        <div className="md:w-1/3">
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </>
  );
};

export default Home;
