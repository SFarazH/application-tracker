import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full  table-auto rounded-lg">
        <thead>
          <tr className="text-left bg-blue-500">
            <th className="py-2 px-4 rounded-tl-lg">Company</th>
            <th className="py-2 px-4 ">Job Role</th>
            <th className="py-2 px-4 ">Platform</th>
            <th className="py-2 px-4 ">Status</th>
            <th className="py-2 px-4 ">Date Applied</th>
            <th className="py-2 px-4 rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className=" bg-white" key={index}>
              <td
                className={`py-2 px-4 border-b ${
                  index === data.length - 1 ? "rounded-bl-lg" : ""
                }`}
              >
                {item.companyName}
              </td>
              <td className="py-2 px-4 border-b">{item.jobRole}</td>
              <td className="py-2 px-4 border-b">{item.platformName}</td>
              <td className="py-2 px-4 border-b">{item.status}</td>
              <td className="py-2 px-4 border-b">{item.dateApplied}</td>
              <td
                className={`py-2 px-4 border-b text-center ${
                  index === data.length - 1 ? "rounded-br-lg" : ""
                }`}
              >
                <div className="flex justify-between">
                  <button className="text-blue-500 hover:text-blue-700 mx-1">
                    <FaEdit size={25} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 mx-1">
                    <FaTrash size={25} />
                  </button>
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
