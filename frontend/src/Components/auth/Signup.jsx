import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:8080/signup", signupData);
      await axios.post("https://echo-1l8d.onrender.com/signup", signupData);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-t from-blue-600 to-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border-[2px] rounded-[10px] bg-white px-10 py-5 gap-5"
      >
        <h1 className="text-center text-3xl font-bold ">Sign Up</h1>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-[13px]">
            Username
          </label>
          <input
            id="username"
            name="username"
            onChange={handleChange}
            value={signupData.username}
            type="text"
            placeholder="Username"
            className="outline-none p-5"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-[13px]">
            Email
          </label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            value={signupData.email}
            type="email"
            placeholder="Email"
            className="outline-none p-5"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-[13px]">
            Password
          </label>
          <input
            id="password"
            name="password"
            onChange={handleChange}
            value={signupData.password}
            type="password"
            placeholder="Password"
            className="outline-none p-5"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] py-1"
        >
          Submit
        </button>
        <span>
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Signup;
