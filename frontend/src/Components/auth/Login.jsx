import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", loginData, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-t to-white from-blue-600">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border-[2px] rounded-[10px] bg-white px-10 py-5 gap-5"
      >
        <h1 className="text-center text-3xl font-bold ">Log In</h1>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-[13px]">
            Username
          </label>
          <input
            id="username"
            name="username"
            onChange={handleChange}
            value={loginData.username}
            type="text"
            placeholder="Username"
            className="outline-none px-5 py-1"
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
            value={loginData.password}
            type="password"
            placeholder="Password"
            className="outline-none px-5 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] py-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
