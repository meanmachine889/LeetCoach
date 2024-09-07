"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError("Username is required.");
      return;
    }

    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      

      if (response.ok) {
        router.push(`/dashboard/${username}`);
      } else {
        setError("Failed to create session. Please try again.");
      }
    } catch (error) {
      console.error("Session creation error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-9 h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-lg flex flex-col gap-5 items-center justify-center shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-400">
          Sign In
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4 w-full">
          <label htmlFor="username" className="block text-gray-500">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-3 bg-zinc-700 outline-none rounded-lg"
          />
        </div>
        <div className="mb-6 w-full">
          <label htmlFor="password" className="block text-gray-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-3 bg-zinc-700 outline-none rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="self-center p-3 bg-zinc-700 text-gray-300 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
