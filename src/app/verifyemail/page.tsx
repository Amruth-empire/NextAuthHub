"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        <h2 className="text-black font-bold text-2xl mb-4">Verify Email</h2>
        <p className="text-sm text-gray-500 break-all mb-4">{token ? token : "No token found"}</p>

        {verified ? (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              ✅ Email Verified!
            </h2>
            <p className="text-gray-700 mb-4">
              Your email has been successfully verified.
            </p>
            <Link
              href="/login"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              Go to Login
            </Link>
          </div>
        ) : error ? (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              ❌ Verification Failed
            </h2>
            <p className="text-gray-700 mb-4">
              The token is invalid or expired.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              Go to Signup
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🔄 Verifying...
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
