// Login.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { io } from "socket.io-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", response?.data?.data?.token);
      
      navigate("/home");

    } catch (error) {
      alert("Login Failed");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://via.placeholder.com/800')" }}>
        {/* Placeholder for image, replace with your actual image URL */}
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Welcome Back!</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg px-8 py-10 w-96">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Don’t have an account? <a href="#" className="text-indigo-500 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
