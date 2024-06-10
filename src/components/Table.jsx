import axios from "axios";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const Table = ({ data }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState({});

  const handleStatusChange = (index, value) => {
    setUpdatedStatus((prev) => ({ ...prev, [index]: value }));
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  const updateStatus = async (index, applicationId) => {
    const status = updatedStatus[index];
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/application/update`,
      method: "patch",
      data: status,
      withCredentials: true,
      params: {
        applicationId: applicationId,
      },
    };
    axios(config)
      .then((res) => {
        console.log(res);
        setEditIndex(null);
      })
      .catch((e) => console.error(e));
  };

  const statusOptions = [
    { value: "Applied", label: "Applied" },
    { value: "Applied Referral", label: "Applied Referral" },
    { value: "Assignment", label: "Assignment" },
    { value: "Interviewing", label: "Interviewing" },
    { value: "Selected", label: "Selected" },
    { value: "Rejected", label: "Rejected" },
  ];

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
            <tr className="bg-white" key={index}>
              <td
                className={`py-2 px-4 border-b ${
                  index === data.length - 1 ? "rounded-bl-lg" : ""
                }`}
              >
                {item.companyName}
              </td>
              <td className="py-2 px-4 border-b">{item.jobRole}</td>
              <td className="py-2 px-4 border-b">{item.platform}</td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <select
                    value={updatedStatus[index] || item.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="rounded w-32 "
                  >
                    <option value="">Select Status</option>
                    {statusOptions.map((status) => (
                      <option value={status.label}>{status.label}</option>
                    ))}
                  </select>
                ) : (
                  <span className="w-32 inline-block">{item.status}</span>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {formatDate(item.dateApplied)}
              </td>
              <td
                className={`py-2 px-4 border-b text-center ${
                  index === data.length - 1 ? "rounded-br-lg" : ""
                }`}
              >
                <div className="flex justify-between">
                  {editIndex === index ? (
                    <FaCheck
                      size={25}
                      className="text-green-500 hover:text-green-700 mx-1 cursor-pointer"
                      onClick={() => updateStatus(index, item._id)}
                    />
                  ) : (
                    <FaEdit
                      className="text-blue-500 hover:text-blue-700 mx-1 cursor-pointer"
                      size={25}
                      onClick={() => setEditIndex(index)}
                    />
                  )}
                  <FaTrash
                    className="text-red-500 hover:text-red-700 mx-1 cursor-pointer"
                    size={25}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
