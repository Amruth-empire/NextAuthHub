"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Bounce, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      toast.success("✅ Login successful!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error: any) {
      toast.error("❌ Login failed!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Login</h1>
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
        >
          Back
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <form className="space-y-4" onSubmit={onLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-400 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-400 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl"
            >
              {buttonDisabled ? "No Login" : "Login"}
            </button>
          </form>
          <ToastContainer />
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
