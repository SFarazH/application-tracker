import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const statusOptions = [
  { value: "Applied", label: "Applied" },
  { value: "Applied Referral", label: "Applied Referral" },
  { value: "Assignment", label: "Assignment" },
  { value: "Interviewing", label: "Interviewing" },
  { value: "Selected", label: "Selected" },
  { value: "Rejected", label: "Rejected" },
];

const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addApplication = async (data) => {
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/application/add`,
      method: "post",
      withCredentials: true,
      data: data,
    };
    axios(config)
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  };

  const onSubmit = (data) => {
    console.log(data);
    addApplication(data);
  };
  console.log(process.env.REACT_APP_BACKEND_LINK, "url");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-16 p-6 bg-white shadow-md rounded-md"
    >
      <div className="mb-4 flex items-center">
        <label
          htmlFor="companyName"
          className="block text-gray-700 font-bold mb-2 w-2/5"
        >
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          {...register("companyName", { required: "Company name is required" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-500 ${
            errors.companyName ? "border-red-500" : ""
          }`}
        />
        {errors.companyName && (
          <span className="text-red-500 text-sm">
            {errors.companyName.message}
          </span>
        )}
      </div>

      <div className="mb-4 flex items-center">
        <label
          htmlFor="jobRole"
          className="block text-gray-700 font-bold mb-2 w-2/5"
        >
          Job Role
        </label>
        <input
          type="text"
          id="jobRole"
          {...register("jobRole", { required: "Job role is required" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-500 ${
            errors.jobRole ? "border-red-500" : ""
          }`}
        />
        {errors.jobRole && (
          <span className="text-red-500 text-sm">{errors.jobRole.message}</span>
        )}
      </div>

      <div className="mb-4 flex items-center">
        <label
          htmlFor="platform"
          className="block text-gray-700 font-bold mb-2 w-2/5"
        >
          Platform
        </label>
        <input
          type="text"
          id="platform"
          {...register("platform", { required: "Platform is required" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-500 ${
            errors.platform ? "border-red-500" : ""
          }`}
        />
        {errors.platform && (
          <span className="text-red-500 text-sm">
            {errors.platform.message}
          </span>
        )}
      </div>

      <div className="mb-4 flex items-center">
        <label
          htmlFor="dateApplied"
          className="block text-gray-700 font-bold mb-2 w-2/5"
        >
          Date Applied
        </label>
        <input
          type="date"
          id="dateApplied"
          {...register("dateApplied", { required: "Date applied is required" })}
          className={`shadow appearance-none border rounded w-full px-3 py-2 text-gray-700  focus:outline-blue-500 ${
            errors.dateApplied ? "border-red-500" : ""
          }`}
        />
        {errors.dateApplied && (
          <span className="text-red-500 text-sm">
            {errors.dateApplied.message}
          </span>
        )}
      </div>

      <div className="mb-4 flex items-center">
        <label
          htmlFor="status"
          className="block text-gray-700 font-bold mb-2 w-2/5"
        >
          Status
        </label>
        <select
          id="status"
          {...register("status", { required: "Status is required" })}
          className={`shadow appearance-none border rounded w-full px-3 py-2 text-gray-700  focus:outline-blue-500 ${
            errors.status ? "border-red-500" : ""
          }`}
        >
          <option value="">Select a status</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.status && (
          <span className="text-red-500 text-sm">{errors.status.message}</span>
        )}
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
