import React, { useState, useEffect } from "react";
import { ArrowDown, ArrowUp, Filter, Send } from "lucide-react";
import { AxiosClient } from "../../api/axiosClient";

export default function TransactionsPage() {
  const [filters, setFilters] = useState({
    date: "",
    type: "",
    amount: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Transfer form state
  const [transferForm, setTransferForm] = useState({
    recipientName: "",
    accountId: "",
    amount: "",
    description: "",
  });
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await AxiosClient("transaction", "get", null, true);
      console.log("transactions response:", res);

      if (res?.transactions) {
        setTransactions(res.transactions);
      } else {
        setError(res?.message || "No transactions found");
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getValidationErrors = () => {
    const errors = {};

    if (!transferForm.recipientName.trim()) {
      errors.recipientName = "Recipient name is required";
    }

    if (!transferForm.accountId.trim()) {
      errors.accountId = "Account number is required";
    } else if (transferForm.accountId.trim().length < 8) {
      errors.accountId = "Account number must be at least 8 digits";
    }

    if (!transferForm.amount) {
      errors.amount = "Amount is required";
    } else if (
      isNaN(transferForm.amount) ||
      parseFloat(transferForm.amount) <= 0
    ) {
      errors.amount = "Amount must be a positive number";
    }

    return errors;
  };

  const validateTransferForm = () => {
    const errors = getValidationErrors();
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendMoney = async () => {
    if (!validateTransferForm()) {
      return;
    }

    setTransferLoading(true);
    setTransferSuccess("");
    setError("");

    try {
      const payload = {
        accountId: transferForm.accountId,
        amount: parseFloat(transferForm.amount),
        category: transferForm.recipientName,
        type: "credit",
        description: transferForm.description,
      };

      const res = await AxiosClient("api/transactions", "post", payload, true);
      console.log("Transfer response:", res);

      if (res && res.message) {
        setTransferSuccess("Money transferred successfully!");
        setTransferForm({});
        setValidationErrors({});
        // Refresh transactions list
        fetchTransactions();
      } else {
        setError(res?.message || "Transfer failed");
      }
    } catch (err) {
      setError(err?.message || "Failed to transfer money");
    } finally {
      setTransferLoading(false);
    }
  };

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

        {transferSuccess && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            {transferSuccess}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Recipient Name"
              value={transferForm.recipientName}
              onChange={(e) => {
                setTransferForm({
                  ...transferForm,
                  recipientName: e.target.value,
                });
                if (validationErrors.recipientName) {
                  setValidationErrors({
                    ...validationErrors,
                    recipientName: "",
                  });
                }
              }}
              className={`w-full border rounded-lg p-2 ${
                validationErrors.recipientName ? "border-red-500" : ""
              }`}
            />
            {validationErrors.recipientName && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.recipientName}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Account Number"
              value={transferForm.accountId}
              onChange={(e) => {
                setTransferForm({ ...transferForm, accountId: e.target.value });
                if (validationErrors.accountId) {
                  setValidationErrors({
                    ...validationErrors,
                    accountId: "",
                  });
                }
              }}
              className={`w-full border rounded-lg p-2 ${
                validationErrors.accountId ? "border-red-500" : ""
              }`}
            />
            {validationErrors.accountId && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.accountId}
              </p>
            )}
          </div>
          <div>
            <input
              type="number"
              placeholder="Amount"
              value={transferForm.amount}
              onChange={(e) => {
                setTransferForm({ ...transferForm, amount: e.target.value });
                if (validationErrors.amount) {
                  setValidationErrors({
                    ...validationErrors,
                    amount: "",
                  });
                }
              }}
              className={`w-full border rounded-lg p-2 ${
                validationErrors.amount ? "border-red-500" : ""
              }`}
            />
            {validationErrors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.amount}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Note"
            value={transferForm.description}
            onChange={(e) =>
              setTransferForm({ ...transferForm, description: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          onClick={handleSendMoney}
          disabled={transferLoading}
          className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {transferLoading ? "Sending..." : "Send Money"}
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
        <div className="grid grid-cols-1  gap-5">
          {loading ? (
            <div className="p-6 flex flex-col items-center">
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
              <p className="mt-2 text-sm text-gray-600">
                Loading transactions...
              </p>
            </div>
          ) : transactions?.length > 0 ? (
            <ul className="divide-y">
              {transactions.map((t) => (
                <li
                  key={t.id}
                  className="py-4 flex justify-between items-center"
                >
                  {/* Title + Date */}
                  <div>
                    <p className="font-semibold">{t.category}</p>
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
          ) : (
            <div className="py-10 flex flex-col items-center text-center">
              <Send className="text-gray-300" size={48} />
              <h3 className="mt-4 text-lg font-semibold text-gray-700">
                No transactions yet
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                You have no transactions to display.
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Start by transferring money or refresh to try again.
              </p>
              <button
                onClick={fetchTransactions}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
