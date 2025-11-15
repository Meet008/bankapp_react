// components/DataTable/DashboardCharts.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardCharts() {
  // Sample data
  const lineData = [
    { month: "Jan", users: 400, orders: 240 },
    { month: "Feb", users: 300, orders: 139 },
    { month: "Mar", users: 500, orders: 980 },
    { month: "Apr", users: 278, orders: 390 },
    { month: "May", users: 189, orders: 480 },
    { month: "Jun", users: 239, orders: 380 },
  ];

  const barData = [
    { month: "Jan", revenue: 2400 },
    { month: "Feb", revenue: 1398 },
    { month: "Mar", revenue: 9800 },
    { month: "Apr", revenue: 3908 },
    { month: "May", revenue: 4800 },
    { month: "Jun", revenue: 3800 },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Users & Orders</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#3B82F6" />
            <Line type="monotone" dataKey="orders" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
