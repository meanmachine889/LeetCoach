"use client";

import React, { useState } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        username: userId,
        password: password,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-around flex-col items-center gap-9  min-h-screen bg-black">
      <h1 className="text-7xl font-bold">Welcome to Syncode {userId} </h1>
      <form
        onSubmit={handleSubmit}
        className="border-2 mb-[10rem] w-[50rem] border-gray-300 p-6 shadow-lg space-y-4"
      >
        <div className="w-[100%] gap-7 flex justify-around">
          <div className="w-[50%]">
            <label
              htmlFor="user_id"
              className="block text-xl font-semibold text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="user_id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="mt-1 w-[100%] block bg-black px-3 py-2 border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="w-[50%]">
            <label
              htmlFor="password"
              className="block text-xl font-semibold text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-[100%] block px-3 bg-black py-2 border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="w-[100%] flex justify-end">
          <button
            type="submit"
            className="w-[48%] self-end py-2 px-4 text-xl bg-white text-black border-gray-300 shadow-sm  font-bold border-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
