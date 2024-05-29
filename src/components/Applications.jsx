import React from "react";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";

const Applications = () => {
  const data = {
    companyName: "ibm",
    jobRole: "Analyst",
    platformName: "clg",
    status: "applied",
    dateApplied: "2024-05-12",
  };
  return (
    <div>
      <table className="w-2/3 divide-y divide-gray-200">
        <colgroup>
          <col className="w-2/24" />
          <col className="w-4/24" />
          <col className="w-3/24" />
          <col className="w-8/24" />
          <col className="w-3/24" />
          <col className="w-2/24" />
          <col className="w-2/24" />
        </colgroup>
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Role
            </th>
            <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Platform
            </th>
            <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="p-2"></th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr key={1}>
            <td className="p-2">{data.companyName}</td>
            <td className="p-2">{data.jobRole}</td>
            <td className="p-2">{data.platformName}</td>
            <td className="p-2">{data.status}</td>
            <td className="">{data.dateApplied}</td>
            <td>
              {" "}
              <TiTick className="text-green-600 text-lg" />
            </td>
            <td>
              <ImCross className="text-red-600 text-lg" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
