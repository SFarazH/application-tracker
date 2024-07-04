import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

const ResetPass = () => {
  const { token } = useParams();
  // const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setLoading(true);

    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/auth/reset/${token}`,
      method: "post",
      data: {
        password,
        confirmPassword,
      },
    };
    axios(config)
      .then((res) => {
        setSuccess(true);
        setError(false);
        setLoading(false);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      })
      .catch((e) => {
        setErrorMsg(e.response?.data.message || "Internal Server Error");
        setSuccess(false);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mt-4">
      <p className="text-5xl md:text-7xl font-thin luckiest flex flex-wrap justify-center mx-auto">
        <span className="lg:mr-8">Application </span> <span>Tracker</span>
      </p>
      <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-md mclaren">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-800"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-md font-medium text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError(false);
              }}
              required
            />
          </div>
          {success && (
            <p className="font-md font-medium text-white text-center bg-green-500 w-fit mx-auto p-1 px-2 rounded-full">
              Password reset successful !
            </p>
          )}
          {error && (
            <p className="font-md font-medium text-white text-center bg-red-500 w-fit mx-auto p-1 px-2 rounded-full">
              {errorMsg} !
            </p>
          )}
          {loading ? (
            <div className="flex items-center gap-2 justify-center px-4 py-2">
              <span className="text-md font-semibold">Loading...</span>
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
          ) : (
            <button
              type="submit"
              className="px-4 py-2 font-medium text-white bg-[#003461] hover:bg-[#0055A0] rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 w-fit block mx-auto duration-100"
            >
              Reset Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
