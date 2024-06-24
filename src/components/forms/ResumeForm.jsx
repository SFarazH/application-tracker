import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

const ResumeForm = ({ setTemp, setForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("role", data.role);
    formData.append("file", data.file[0]);

    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/resume/add`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    axios(config)
      .then(() => {
        setUploading(false);
        setSuccess(true);
        setTemp((p) => p + 1);
        setTimeout(() => {
          setForm(false);
        }, 1500);
      })
      .catch((error) => console.error("Error uploading the resume:", error));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-sky-100 p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            id="role"
            type="text"
            {...register("role", { required: "Role is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-950 focus:ring-offset ${
              errors.role ? "border-red-500" : ""
            }`}
          />
          {errors.role && (
            <span className="text-red-500 text-sm">{errors.role.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700  font-bold mb-2" htmlFor="file">
            Upload Resume
          </label>
          <input
            id="file"
            type="file"
            {...register("file", { required: "File is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-950 focus:ring-offset ${
              errors.file ? "border-red-500" : ""
            }`}
          />
          {errors.file && (
            <span className="text-red-500 text-sm">{errors.file.message}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-950 focus:ring-offset-1 mx-auto"
          >
            Add Resume
          </button>
        </div>
        {uploading && (
          <div className="flex items-center gap-2 mt-4 justify-center">
            <span className="text-md font-semibold">Uploading Resume</span>
            <Hourglass
              visible={true}
              height="25"
              width="25"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          </div>
        )}
        {success && (
          <p className="mt-4 text-green-500 font-semibold text-center">
            Resume Uploaded!
          </p>
        )}
      </form>
    </div>
  );
};

export default ResumeForm;
