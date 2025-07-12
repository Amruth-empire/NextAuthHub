import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "Detailed view of user profile",
};

interface PageProps {
  params: {
    id: string;
  };
}

const UserProfilePage: React.FC<PageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">👤 User Profile</h2>
        <p className="text-lg text-gray-700">
          Viewing profile for user ID:{" "}
          <span className="font-mono text-blue-600">{id}</span>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          (In a real app, this page would fetch and show user details from the
          database using this ID.)
        </p>
      </div>
    </div>
  );
};

export default UserProfilePage;
