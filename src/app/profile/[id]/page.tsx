import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User Profile",
  description: "Detailed view of user profile",
};

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function UserProfilePage({ params, searchParams }: PageProps) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">👤 User Profile</h2>
        <p className="text-lg text-gray-700">
          Viewing profile for user ID: <span className="font-mono text-blue-600">{id}</span>
        </p>

        <div className="mt-6 space-y-4">
          <p className="text-sm text-gray-500">
            This page demonstrates proper type handling for dynamic routes.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <Link
            href="/profile"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Back to Profile Home
          </Link>
        </div>
      </div>
    </div>
  );
}
