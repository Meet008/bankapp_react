import React from "react";
import { useAuth } from "../../context/Authcontext";

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full md:ml-60 h-16 bg-blue-600 text-white flex items-center justify-between px-4 z-40 shadow">
      <div className="flex items-center">
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-blue-500 mr-2"
          onClick={toggleSidebar}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="font-bold text-lg">Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        {user && <span>{user.name}</span>}
        <button
          className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
