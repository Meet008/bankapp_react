import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "md:ml-60" : "md:ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page content */}
        <main className="flex-1 pt-16 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
