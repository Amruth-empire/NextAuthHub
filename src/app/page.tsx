"use client";

import Link from "next/link";
import { FaLock, FaUserShield, FaRocket } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">NextAuthHub</h1>
        <nav className="space-x-4">
          <Link href="/login" className="text-blue-600  font-bold">
            Login
          </Link>
          <Link href="/signup" className="text-blue-600  font-bold">
            Signup
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">NextAuthHub</span>
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-10 text-lg">
          A secure and modern authentication system powered by Next.js App Router, MongoDB, JWT, and Tailwind CSS. Fast, reliable, and customizable.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <FaLock className="text-blue-500 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Authentication</h3>
            <p className="text-gray-600 text-sm">Built-in protection with hashed passwords, JWT tokens, and email verification.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <FaUserShield className="text-indigo-500 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Role-based Access</h3>
            <p className="text-gray-600 text-sm">Easily manage user roles like admin, verified users, and public access.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <FaRocket className="text-purple-500 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast & Scalable</h3>
            <p className="text-gray-600 text-sm">Designed to scale with optimized database access and modern API structure.</p>
          </div>
        </div>

        <Link
          href="/signup"
          className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-600 text-sm text-center py-4 border-t">
        &copy; {new Date().getFullYear()} NextAuthHub. All rights reserved.
      </footer>
    </div>
  );
}
