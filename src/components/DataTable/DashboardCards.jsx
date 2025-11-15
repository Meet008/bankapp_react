// components/DataTable/DashboardCards.jsx
import React from "react";

export default function DashboardCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white p-6 rounded-lg shadow flex flex-col justify-between"
        >
          <h3 className="text-gray-500 text-sm">{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
