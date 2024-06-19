import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ResumeForm = ({ setTemp, setForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("role", data.role);
    formData.append("file", data.file[0]);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/resume/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setTemp((p) => p + 1);
      setTimeout(() => {
        setForm(false);
      }, 1500);
    } catch (error) {
      console.error("Error uploading the resume:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            id="role"
            type="text"
            {...register("role", { required: "Role is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${
              errors.role ? "border-red-500" : ""
            }`}
          />
          {errors.role && (
            <span className="text-red-500 text-sm">{errors.role.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
            Upload Resume
          </label>
          <input
            id="file"
            type="file"
            {...register("file", { required: "File is required" })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
