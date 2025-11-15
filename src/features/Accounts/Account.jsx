import React from "react";
import { Wallet, CreditCard, Landmark, ArrowRight } from "lucide-react";

export default function AccountsPage() {
  const accounts = [
    {
      id: 1,
      type: "Savings Account",
      icon: <Wallet className="text-green-600" />,
      number: "XXXX 9134",
      balance: "₹45,200",
      status: "Active",
    },
    {
      id: 2,
      type: "Checking Account",
      icon: <Landmark className="text-blue-600" />,
      number: "XXXX 1120",
      balance: "₹12,900",
      status: "Active",
    },
    {
      id: 3,
      type: "Credit Account",
      icon: <CreditCard className="text-red-600" />,
      number: "XXXX 5521",
      balance: "₹5,000 Due",
      status: "Pending",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Accounts</h1>

      {/* Account List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            {/* Icon + Type */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                {acc.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{acc.type}</h2>
                <p className="text-gray-500 text-sm">{acc.number}</p>
              </div>
            </div>

            {/* Balance */}
            <p className="text-3xl font-bold mb-4">{acc.balance}</p>

            {/* Status */}
            <p
              className={`inline-block px-3 py-1 rounded text-sm mb-4 ${
                acc.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {acc.status}
            </p>

            {/* Quick Access */}
            <button className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800">
              View Details <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
