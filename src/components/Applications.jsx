import React from "react";
import Table from "./Table";

const Applications = () => {
  const data = [
    {
      companyName: "ibm",
      jobRole: "Analyst",
      platformName: "clg",
      status: "applied",
      dateApplied: "2024-05-12",
    },
    {
      companyName: "ibm",
      jobRole: "Analyst",
      platformName: "clg",
      status: "applied",
      dateApplied: "2024-05-12",
    },
  ];
  return (
    <div className="bg-red-100 ">
      <p>Applications</p>
      <Table data={data} />
    </div>
  );
};

export default Applications;
