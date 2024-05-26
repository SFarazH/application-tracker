import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const Success = () => (
    <p className="text-xl text-green-500 font-semibold text-center">
      Successfully Registered!
    </p>
  );
  const Error = () => (
    <p className="text-xl text-red-500 font-semibold text-center">
      Email already exists!
    </p>
  );

  const handleSubmit = (e) => {
    console.log("clicked");
    e.preventDefault();
    const config = {
      url: "http://localhost:8257/auth/register",
      method: "post",
      data: {
        name,
        email,
        password,
      },
    };
    axios(config)
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((e) => {
        e.response.status === 409 ? setError(true) : console.error(e);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
        </form>
        {success && <Success />}
        {error && <Error />}
        <div className="text-center">
          <p className="text-sm">
            Already registered?{" "}
            <Link to="/login">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
