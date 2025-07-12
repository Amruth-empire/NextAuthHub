"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<string>("");

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("✅ Logout successful!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Logout failed:", error.message);
      } else {
        console.error("An unknown error occurred during logout.");
      }

      toast.error("❌ Logout failed!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const getUserDetails = async (): Promise<void> => {
    try {
      const res = await axios.get("/api/users/user");
      setData(res.data.user._id);
    } catch (error: unknown) {
      console.error("Error fetching user details", error);
      toast.error("❌ Failed to fetch user details.", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 text-black">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Profile!</h1>
        <h2 className="text-xl font-semibold text-gray-800">
          {data ? (
            <Link
              href={`/profile/${data}`}
              className="text-blue-600 hover:text-blue-800 hover:underline-offset-2 transition duration-200"
            >
              Go to Profile
            </Link>
          ) : (
            ""
          )}
        </h2>

        <div className="mt-4 space-x-2">
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
          >
            Get User Details
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ProfilePage;
