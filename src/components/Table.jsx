import axios from "axios";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { ThreeDots } from "react-loader-spinner";

const Table = ({ data, setTemp }) => {
  const statusOptions = [
    { value: "Applied", label: "Applied" },
    { value: "Applied Referral", label: "Applied Referral" },
    { value: "Assignment", label: "Assignment" },
    { value: "Interviewing", label: "Interviewing" },
    { value: "Selected", label: "Selected" },
    { value: "Rejected", label: "Rejected" },
  ];

  const [check, setCheck] = useState(false);
  const [updatedStatus, setNewStatus] = useState(statusOptions[0].value);
  const [idupdateStatus, setIdStatus] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const [open, setOpen] = useState(false);

  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }
  const updateStatus = async (applicationId) => {
    setCheck(true);
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/application/update`,
      method: "patch",
      data: { status: updatedStatus },
      withCredentials: true,
      params: {
        applicationId: applicationId,
      },
    };
    axios(config)
      .then((res) => {
        setTimeout(() => {
          setIdStatus(null);
        }, 1000);
        setTemp((p) => p + 1);
      })
      .catch((e) => console.error(e))
      .finally(() =>
        setTimeout(() => {
          setCheck(false);
        }, 1000)
      );
  };
  const displayStatus = (status) => {
    let color = "";
    switch (status) {
      case "Pending":
        color = "gold";
        break;
      case "Selected":
        color = "green";
        break;
      case "Assignment":
        color = "orange";
        break;
      case "Interviewing":
        color = "green";
        break;
      case "Rejected":
        color = "red";
        break;

      default:
        color = "#F8E800";
    }
    return (
      <div className="flex items-center">
        <RiCheckboxBlankCircleFill
          color={color}
          style={{ marginRight: "4px" }}
        />{" "}
        <span className="w-32 inline-block">{status}</span>{" "}
      </div>
    );
  };
  const deleteNote = async (id) => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/application/rem`,
      method: "delete",
      params: {
        applicationId: id,
      },
      withCredentials: true,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        setTemp((p) => p + 1);
        setOpen(false);
      })
      .catch((e) => console.error(e));
  };
  const border = (index) => {
    return index === data.length - 1 ? "" : "border-b border-indigo-950";
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full table-auto rounded-lg">
        <thead>
          <tr className="text-left bg-blue-500 text-white font-normal">
            <th className="py-2 px-4 rounded-tl-lg">Company</th>
            <th className="py-2 px-4">Job Role</th>
            <th className="py-2 px-4">Platform</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Date Applied</th>
            <th className="py-2 px-4 rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className="bg-sky-200" key={index}>
              <td
                className={`py-2 px-4  ${
                  index === data.length - 1
                    ? "rounded-bl-lg"
                    : "border-b border-indigo-950"
                }`}
              >
                {item.companyName}
              </td>
              <td className={`py-2 px-4 ${border(index)} `}>{item.jobRole}</td>
              <td className={`py-2 px-4 ${border(index)} `}>{item.platform}</td>
              <td className={`py-2 px-4 ${border(index)} `}>
                {item._id === idupdateStatus ? (
                  check ? (
                    <ThreeDots
                      visible={true}
                      height="24"
                      width="30"
                      color="#000000"
                      radius="4"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass="p-0 m-0 w-32"
                    />
                  ) : (
                    <select
                      value={updatedStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="rounded w-32"
                    >
                      {statusOptions.map((status) => (
                        <option value={status.label}>{status.label}</option>
                      ))}
                    </select>
                  )
                ) : (
                  displayStatus(item.status)
                )}
              </td>
              <td className={`py-2 px-4 ${border(index)} `}>
                {formatDate(item.dateApplied)}
              </td>
              <td
                className={`py-2 px-4 text-center ${
                  index === data.length - 1
                    ? "rounded-br-lg"
                    : " border-b border-indigo-950"
                }`}
              >
                <div className="flex justify-between gap-4 md:gap-0">
                  {item._id === idupdateStatus ? (
                    <FaCheck
                      size={25}
                      className="text-green-500 hover:text-green-700 mx-1 cursor-pointer"
                      onClick={() => {
                        updateStatus(item._id);
                      }}
                    />
                  ) : (
                    <FaEdit
                      className="text-blue-500 hover:text-blue-700 mx-1 cursor-pointer"
                      size={25}
                      onClick={() => setIdStatus(item._id)}
                    />
                  )}
                  <FaTrash
                    className="text-red-500 hover:text-red-700 mx-1 cursor-pointer"
                    size={25}
                    onClick={() => {
                      setIdDelete(item._id);
                      setOpen(true);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* modal */}
      {open && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-2">
          <div className="fixed inset-0 bg-black opacity-70"></div>
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white p-5">
              <p className="font-semibold text-lg">
                Are you sure you want to delete this application?
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <button
                  className="bg-green-500 text-white hover:bg-green-600 cursor-pointer p-2 rounded-lg text-xl font-semibold"
                  onClick={() => {
                    deleteNote(idDelete);
                  }}
                >
                  Yes
                </button>
                <button
                  className="bg-red-500 text-white hover:bg-red-600 cursor-pointer p-2 rounded-lg text-xl font-semibold"
                  onClick={() => {
                    setOpen(false);
                    setIdDelete("");
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
