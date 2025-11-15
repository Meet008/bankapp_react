import React from "react";
import {
  ArrowUpRight,
  Plus,
  Wallet,
  CreditCard,
  ArrowDown,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Balance */}
        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-500">Total Balance</h2>
            <Wallet className="w-6 h-6 text-indigo-600" />
          </div>
          <p className="text-3xl font-semibold mt-2">₹1,24,500</p>
        </div>

        {/* Savings */}
        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-500">Savings</h2>
            <ArrowUpRight className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-semibold mt-2">₹45,300</p>
        </div>

        {/* Expenses */}
        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-500">Expenses</h2>
            <ArrowDown className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-3xl font-semibold mt-2">₹28,900</p>
        </div>
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
        <ul className="divide-y">
          <li className="py-3 flex justify-between">
            <span>Amazon Shopping</span>
            <span className="text-red-600 font-medium">-₹1,200</span>
          </li>
          <li className="py-3 flex justify-between">
            <span>Salary Credit</span>
            <span className="text-green-600 font-medium">+₹25,000</span>
          </li>
          <li className="py-3 flex justify-between">
            <span>Electricity Bill</span>
            <span className="text-red-600 font-medium">-₹900</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
