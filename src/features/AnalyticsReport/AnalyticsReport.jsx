import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Download } from "lucide-react";

export default function AnalyticsPage() {
  const monthlySpending = [
    { month: "Jan", amount: 12000 },
    { month: "Feb", amount: 14500 },
    { month: "Mar", amount: 11000 },
    { month: "Apr", amount: 16000 },
    { month: "May", amount: 18000 },
    { month: "Jun", amount: 15000 },
  ];

  const categoryData = [
    { name: "Food", value: 4500 },
    { name: "Shopping", value: 6200 },
    { name: "Bills", value: 3800 },
    { name: "Travel", value: 2200 },
    { name: "Others", value: 1500 },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Analytics & Reports</h1>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <SummaryCard label="Total Spending (This Month)" value="₹18,000" />
        <SummaryCard label="Highest Spending Category" value="Shopping" />
        <SummaryCard label="Average Monthly Spend" value="₹14,800" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Spending Trend */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Monthly Spending Trend</h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4F46E5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Download Reports */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Download Reports</h2>

        <div className="flex gap-4">
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition">
            <Download className="w-5" /> Download PDF
          </button>

          <button className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
            <Download className="w-5" /> Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}

/* Small Component for Summary Cards */
const SummaryCard = ({ label, value }) => (
  <div className="bg-white p-5 rounded-xl shadow">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);
