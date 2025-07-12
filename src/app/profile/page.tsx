"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const onlogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("✅ Logout successful!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => router.push("/login"), 1000);
    } catch (error: any) {
      toast.error("❌ Logout failed: " + error.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const getUserdetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/user");
      setData(res.data.user._id);
    } catch (error: any) {
      toast.error("❌ Failed to get user", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  // Safe version to load user data on mount
  useEffect(() => {
    getUserdetails();
  }, []); // Empty dependency = run once on mount

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 text-black">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Profile!</h1>
        
        <div className="mb-6 min-h-[40px]">
          {loading ? (
            <p className="text-gray-500">Loading user data...</p>
          ) : data ? (
            <Link
              href={`/profile/${data}`}
              className="text-blue-600 hover:text-blue-800 hover:underline text-lg font-medium transition duration-200"
              aria-label="Go to user profile"
            >
              Go to My Profile
            </Link>
          ) : (
            <p className="text-gray-500">No user data available</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onlogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl"
            aria-label="Log out"
            disabled={loading}
          >
            Logout
          </button>
          
          <button
            onClick={getUserdetails}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
            aria-label="Refresh user data"
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh Data"}
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ProfilePage;