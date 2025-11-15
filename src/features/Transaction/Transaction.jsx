import React, { useState } from "react";
import { ArrowDown, ArrowUp, Filter, Send } from "lucide-react";

export default function TransactionsPage() {
  const [filters, setFilters] = useState({
    date: "",
    type: "",
    amount: "",
  });

  const transactions = [
    {
      id: 1,
      label: "Salary Credit",
      amount: "+₹25,000",
      type: "credit",
      date: "2025-11-01",
    },
    {
      id: 2,
      label: "ATM Withdrawal",
      amount: "-₹3,000",
      type: "debit",
      date: "2025-11-03",
    },
    {
      id: 3,
      label: "Electricity Bill",
      amount: "-₹1,200",
      type: "debit",
      date: "2025-11-04",
    },
    {
      id: 4,
      label: "UPI Received",
      amount: "+₹1,500",
      type: "credit",
      date: "2025-11-05",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="text-indigo-600" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Date Filter */}
          <input
            type="date"
            className="border rounded-lg p-2"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />

          {/* Type Filter */}
          <select
            className="border rounded-lg p-2"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>

          {/* Amount Filter */}
          <input
            type="number"
            placeholder="Amount ≥"
            className="border rounded-lg p-2"
            value={filters.amount}
            onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
          />
        </div>
      </div>

      {/* Transfer Money Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Send className="text-green-600" /> Transfer Money
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Recipient Name"
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Account Number"
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Amount"
            className="border rounded-lg p-2"
          />
        </div>

        <button className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
          Send Money
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

        <ul className="divide-y">
          {transactions.map((t) => (
            <li key={t.id} className="py-4 flex justify-between items-center">
              {/* Title + Date */}
              <div>
                <p className="font-semibold">{t.label}</p>
                <p className="text-sm text-gray-500">{t.date}</p>
              </div>

              {/* Amount */}
              <div className="flex items-center gap-2">
                {t.type === "credit" ? (
                  <ArrowUp className="text-green-600" />
                ) : (
                  <ArrowDown className="text-red-600" />
                )}

                <span
                  className={`font-semibold ${
                    t.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.amount}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
