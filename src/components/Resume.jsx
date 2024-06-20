import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import ResumeForm from "./forms/ResumeForm";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";

const Resume = () => {
  const [resumes, setResumes] = useState([]);
  const [temp, setTemp] = useState(0);
  const [isForm, setForm] = useState(false);

  const getResumes = async () => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/resume/get`,
      method: "get",
      withCredentials: true,
    };
    axios(config)
      .then((res) => setResumes(res.data))
      .catch((e) => console.error(e));
  };

  const openResume = async (id) => {
    console.log("opening resume...");
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
      })
      .catch((e) => console.error(e));
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
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getResumes();
  }, [temp]);
  return (
    <div className="p-4 py-2">
      <div className="flex justify-between">
        <p className="text-3xl font-semibold">Resume</p>
        {isForm ? (
          <IoCloseCircle
            size={40}
            color="red"
            onClick={() => {
              setForm(false);
            }}
            className="cursor-pointer"
          />
        ) : (
          <IoAddCircle
            size={40}
            color="green"
            onClick={() => {
              setForm(true);
            }}
            className="cursor-pointer"
          />
        )}
      </div>
      {isForm ? (
        <ResumeForm setTemp={setTemp} setForm={setForm} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          {resumes?.map((resume) => (
            <>
              <div className="border rounded-lg flex justify-between items-center cursor-pointer">
                <p
                  className="text-xl p-2 w-full"
                  onClick={() => openResume(resume._id)}
                >
                  {resume.role}
                </p>
                <div
                  className="bg-red-500 h-full px-3 flex items-center rounded-r-lg  hover:bg-red-600"
                  onClick={() => deleteResume(resume._id)}
                >
                  <ImCross size={15} color="white" />
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resume;
