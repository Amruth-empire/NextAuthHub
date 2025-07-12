"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  const onlogout = async () => {
    try {
      axios.get("/api/users/logout");
      toast.success("✅ Logout successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      console.log(error.message);

      toast.error("❌ Logout failed!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const getUserdetils = async () => {
    const res = await axios.get("api/users/user");
    setData(res.data.user._id);
  };

  // useEffect(() => {
  //   getUserdetils();
  // }, [data]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 text-black">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Profile!</h1>
        <h2 className="text-xl font-semibold text-gray-800">
          {data === "" ? (
            ""
          ) : (
            <Link
              href={`/profile/${data}`}
              className="text-blue-600 hover:text-blue-800 hover:underline-offset-2 transition duration-200"
            >
              Go to Profile
            </Link>
          )}
        </h2>

        <button
          onClick={onlogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl"
        >
          Logout
        </button>
        <button
          onClick={getUserdetils}
          className="bg-green-700 hover:bg-green-800 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300 ml-2"
        >
          Get User Details
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ProfilePage;
