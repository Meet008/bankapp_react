// features/Dashboard/Dashboard.jsx
import React from "react";
import DashboardCards from "../../components/DataTable/DashboardCards";
import DashboardTable from "../../components/DataTable/DashboardTable";
import DashboardCharts from "../../components/DataTable/DashboardCharts";

export default function Dashboard() {
  const stats = [
    { title: "Users", value: 1200 },
    { title: "Orders", value: 350 },
    { title: "Revenue", value: "$12,400" },
  ];

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
  ];

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", role: "User" },
  ];

  return (
    <div className="p-6 bg-gray-50 flex flex-col space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Cards */}
      <DashboardCards stats={stats} />

      {/* Table */}
      <DashboardTable columns={columns} data={data} />

      {/* Charts */}
      <DashboardCharts />
    </div>
  );
}
