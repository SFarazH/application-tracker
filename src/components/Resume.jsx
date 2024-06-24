import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import ResumeForm from "./forms/ResumeForm";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import Spinner from "./Spinner";
import { Hourglass, ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Resume = () => {
  const [resumes, setResumes] = useState([]);
  const [temp, setTemp] = useState(0);
  const [isForm, setForm] = useState(false);
  const [opening, setOpening] = useState(false);
  const [isSpinner, setSpinner] = useState(true);

  const getResumes = async () => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/resume/get`,
      method: "get",
      withCredentials: true,
    };
    axios(config)
      .then((res) => {
        setResumes(res.data);
        setSpinner(false);
      })
      .catch((e) => console.error(e));
  };

  const openResume = async (id) => {
    setOpening(true);
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/resume/getId`,
      method: "get",
      params: {
        resumeId: id,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    };
    axios(config)
      .then(async (res) => {
        const blob = await res.data;
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
        setOpening(false);
      })
      .catch((e) => {
        console.error(e);
        setOpening(false);
      });
  };

  const deleteResume = async (id) => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/resume/del`,
      method: "delete",
      params: {
        resumeId: id,
      },
      withCredentials: true,
    };
    axios(config)
      .then((res) => {
        setTemp((p) => p + 1);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getResumes();
  }, [temp]);

  return (
    <div className="p-4 py-2 mt-4 min-h-72">
      <div className="flex justify-between items-center">
        <p className="text-black text-5xl font-semibold bebas tracking-wide">
          Resumes
        </p>
        {isForm ? (
          <IoCloseCircle
            size={40}
            color="red"
            onClick={() => setForm(false)}
            className="cursor-pointer"
          />
        ) : (
          <IoAddCircle
            size={40}
            color="green"
            onClick={() => setForm(true)}
            className="cursor-pointer"
          />
        )}
      </div>
      {isForm ? (
        <ResumeForm setTemp={setTemp} setForm={setForm} />
      ) : isSpinner ? (
        <div className="flex justify-center mt-4">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {resumes?.map((resume) => (
            <div
              key={resume._id}
              className="rounded-lg flex justify-between items-center cursor-pointer bg-[#02182B] text-white"
            >
              <p
                className="text-xl p-2 w-full"
                onClick={() => openResume(resume._id)}
              >
                {resume.role}
              </p>
              <div
                className="bg-red-500 h-full px-3 flex items-center rounded-r-lg hover:bg-red-600"
                onClick={() => deleteResume(resume._id)}
              >
                <ImCross size={15} color="white" />
              </div>
            </div>
          ))}
        </div>
      )}

      {opening && (
        <div className="mt-8 flex gap-4 items-center">
          <p className="text-lg">Opening resume </p>
          <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="#000000"
            radius="4"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
};

export default Resume;
