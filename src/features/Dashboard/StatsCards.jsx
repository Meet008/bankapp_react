import React from "react";

export default function StatsCards() {
  const stats = [
    { title: "Users", value: 1200 },
    { title: "Orders", value: 350 },
    { title: "Revenue", value: "$12,400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
