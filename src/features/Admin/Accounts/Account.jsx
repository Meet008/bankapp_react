import React, { useState, useEffect } from "react";
import { Wallet, CreditCard, Landmark, ArrowRight, Send } from "lucide-react";
import { AxiosClient } from "../../../api/axiosClient";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([
    // {
    //   id: 1,
    //   type: "Savings Account",
    //   icon: <Wallet className="text-green-600" />,
    //   number: "XXXX 9134",
    //   balance: "₹45,200",
    //   status: "Active",
    // },
    // {
    //   id: 2,
    //   type: "Checking Account",
    //   icon: <Landmark className="text-blue-600" />,
    //   number: "XXXX 1120",
    //   balance: "₹12,900",
    //   status: "Active",
    // },
    // {
    //   id: 3,
    //   type: "Credit Account",
    //   icon: <CreditCard className="text-red-600" />,
    //   number: "XXXX 5521",
    //   balance: "₹5,000 Due",
    //   status: "Pending",
    // },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAccounts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await AxiosClient("accounts/me", "get", null, true);
      console.log(res, "-res");
      if (res?.data) {
        setAccounts(res.data);
      } else {
        setError(res?.message || "No accounts found");
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Accounts</h1>

      {/* Account List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="mt-2 text-sm text-gray-600">Loading accounts...</p>
          </div>
        ) : accounts?.length > 0 ? (
          accounts.map((acc) => {
            const icon = acc.icon ? (
              acc.icon
            ) : acc.type && acc.type.toLowerCase().includes("saving") ? (
              <Wallet className="text-green-600" />
            ) : acc.type && acc.type.toLowerCase().includes("credit") ? (
              <CreditCard className="text-red-600" />
            ) : (
              <Landmark className="text-blue-600" />
            );

            return (
              <div
                key={acc.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              >
                {/* Icon + Type */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{acc.type}</h2>
                    <p className="text-gray-500 text-sm">{acc.number}</p>
                  </div>
                </div>

                {/* Balance */}
                <p className="text-3xl font-bold mb-4">
                  {Number(acc.balance).toLocaleString("en-CA", {
                    style: "currency",
                    currency: "CAD",
                  })}
                </p>

                {/* Status */}
                <p
                  className={`inline-block px-3 py-1 rounded text-sm mb-4 ${
                    acc.status === "ACTIVE"
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
            );
          })
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
            <Send className="text-gray-300" size={48} />
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              No accounts yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You have no accounts to display.
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Start by transferring money or refresh to try again.
            </p>
            <button
              onClick={fetchAccounts}
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
