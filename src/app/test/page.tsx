"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [message, setMessage] = useState("Checking connection...");

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetch("/api/test");
        const data = await res.json();
        setMessage(data.message);
      } catch (error) {
        setMessage("❌ Failed to connect to database");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold mb-4 text-black">
          Database Connection Test
        </h1>
        <p className="text-lg text-gray-700">{message}</p>
      </div>
    </div>
  );
}
