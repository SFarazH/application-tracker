import { React, useState, useSyncExternalStore } from "react";
import { useAuth } from "../components/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { setAuthUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:4000/auth/login",
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
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((e) => {
        setError(true);
        setSuccess(false);
        setErrorMsg(e.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
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
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
          {error && (
            <p className="font-md font-semibold text-red-500 text-center">
              {errorMsg}!
            </p>
          )}
          {success && (
            <p className="font-md font-semibold text-green-500 text-center">
              Successfully Logged In!{" "}
            </p>
          )}
          {/* {isLoggedIn && <p>{authUser.name}</p>} */}
        </form>
        <div className="text-center">
          <p className="text-sm">
            New user?{" "}
            <Link to="/register">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          const config = {
            url: "http://localhost:4000/auth/verify",
            method: "get",
            withCredentials: true,
          };
          axios(config)
            .then((res) => console.log(res.data))
            .catch((e) => console.error(e));
        }}
      >
        click
      </button>
    </div>
  );
};

export default Login;
