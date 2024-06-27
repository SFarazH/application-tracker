import { React, useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import axios from "axios";

const Login = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [logging, setLogging] = useState(false);
  const { authUser, verifyUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogging(true);
    const config = {
      url: `${process.env.REACT_APP_BACKEND_LINK}/auth/login`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
      withCredentials: true,
    };
    axios(config)
      .then((res) => {
        setError(false);
        setSuccess(true);
        verifyUser();
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      })
      .catch((e) => {
        setError(true);
        setSuccess(false);
        setErrorMsg(e.response.data.message);
      })
      .finally(() => setLogging(false));
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-blue-200 rounded">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                error && setError(false);
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {logging ? (
            <div className="flex items-center gap-2 justify-center px-4 py-2">
              <span className="text-md font-semibold">Logging in</span>
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
              Login
            </button>
          )}
          {error && (
            <p className="font-md font-medium text-white text-center bg-red-500 w-fit mx-auto p-1 px-2 rounded-full">
              {errorMsg ? errorMsg : "Internal Server Error"} !
            </p>
          )}
          {success && (
            <p className="font-md font-medium text-white text-center bg-green-500 w-fit mx-auto p-1 px-2 rounded-full">
              Successfully Logged In!{" "}
            </p>
          )}
        </form>
        <div className="text-center">
          <p className="text-md">
            New user?{" "}
            <span
              onClick={() => {
                setActiveTab(1);
              }}
              className="font-medium text-[#003461] hover:text-[#0055A0] cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
