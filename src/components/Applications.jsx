import React, { useEffect, useState } from "react";
import Table from "./Table";
import ApplicationForm from "./forms/ApplicationForm";
import { IoCloseCircle, IoAddCircle } from "react-icons/io5";
import axios from "axios";
import Spinner from "./Spinner";

const Applications = () => {
  const [isForm, setForm] = useState(false);
  const [applications, setApplications] = useState([]);
  const [isSpinner, setSpinner] = useState(true);
  const [temp, setTemp] = useState(0);

  const getData = async () => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/application/get`,
      method: "get",
      withCredentials: true,
    };
    axios(config)
      .then((res) => {
        setApplications(res.data);
        setSpinner(false);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getData();
  }, [temp]);

  return (
    <div className="p-4 py-2 mt-4 min-h-[50vh]">
      <div className="flex justify-between items-center">
        <p className="text-black text-4xl md:text-5xl font-semibold bebas tracking-wide flex items-center gap-4 md:gap-3">
          Applications <span className="text-3xl md:text-4xl font-normal">({applications.length})</span>
        </p>
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
            color="#003461"
            onClick={() => {
              setForm(true);
            }}
            className="cursor-pointer"
          />
        )}
      </div>
      {isForm ? (
        <ApplicationForm setForm={setForm} setTemp={setTemp} />
      ) : isSpinner ? (
        <div className="flex justify-center mt-4">
          <Spinner />
        </div>
      ) : applications.length > 0 ? (
        <Table data={applications} setTemp={setTemp} />
      ) : (
        <p className="text-3xl md:text-4xl font-semibold text-center economica mt-8 md:mt-0">
          No applications found :(
        </p>
      )}
    </div>
  );
};

export default Applications;
