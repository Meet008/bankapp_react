import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Plus,
  Wallet,
  CreditCard,
  ArrowDown,
} from "lucide-react";
import { AxiosClient } from "../../api/axiosClient";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await AxiosClient(
        `dashboard/summary/${localStorage.getItem("user_id")}`,
        "get",
        null,
        true
      );
      if (res) {
        setData(res.data);
      } else {
        setError(res?.message || "No data found");
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
              </div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mt-4" />
            </div>
          ))
        ) : (
          <>
            {/* Total Balance */}
            <div className="bg-white p-5 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-500">Total Balance</h2>
                <Wallet className="w-6 h-6 text-indigo-600" />
              </div>
              <p className="text-3xl font-semibold mt-2">
                {data?.totalBalance ?? "₹0.0"}
              </p>
            </div>

            {/* Savings */}
            <div className="bg-white p-5 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-500">Savings</h2>
                <ArrowUpRight className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-semibold mt-2">
                {data?.savings ?? "₹0.0"}
              </p>
            </div>

            {/* Expenses */}
            <div className="bg-white p-5 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-500">Expenses</h2>
                <ArrowDown className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-3xl font-semibold mt-2">
                {data?.expenses ?? "₹0.0"}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button className="bg-indigo-600 text-white py-3 rounded-xl flex flex-col items-center shadow hover:bg-indigo-700 transition">
          <Plus className="w-6 h-6 mb-1" />
          Add Money
        </button>

        <button className="bg-green-600 text-white py-3 rounded-xl flex flex-col items-center shadow hover:bg-green-700 transition">
          <ArrowUpRight className="w-6 h-6 mb-1" />
          Send Money
        </button>

        <button className="bg-blue-600 text-white py-3 rounded-xl flex flex-col items-center shadow hover:bg-blue-700 transition">
          <CreditCard className="w-6 h-6 mb-1" />
          Pay Bills
        </button>

        <button className="bg-orange-600 text-white py-3 rounded-xl flex flex-col items-center shadow hover:bg-orange-700 transition">
          <Wallet className="w-6 h-6 mb-1" />
          View Accounts
        </button>
      </div>

      {/* Recent Transactions */}
      <h2 className="text-xl font-semibold mt-10 mb-3">Recent Transactions</h2>
      <div className="bg-white p-5 rounded-xl shadow">
        {loading ? (
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="py-3 flex justify-between items-center">
                <div className="w-2/3">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse" />
                </div>
                <div className="w-24">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                </div>
              </li>
            ))}
          </ul>
        ) : data?.transactions && data.transactions.length > 0 ? (
          <ul className="divide-y">
            {data.transactions.map((t) => (
              <li key={t.id} className="py-3 flex justify-between">
                <span>{t.label || t.category || "Transaction"}</span>
                <span
                  className={`${
                    t.type === "credit" ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {t.amount}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 flex flex-col items-center text-center">
            <svg
              className="text-gray-300"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                stroke="#E5E7EB"
                strokeWidth="1.5"
              />
              <path
                d="M8 12h8"
                stroke="#E5E7EB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              No transactions yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You have no recent transactions to display.
            </p>
            <button
              onClick={fetchDashboardData}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
