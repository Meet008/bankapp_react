import React, { useState, useEffect } from "react";
import { Filter, Send } from "lucide-react";
import { AxiosClient } from "../../api/axiosClient";

export default function TransactionsPage() {
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    minAmount: "",
    maxAmount: "",
    type: "", // CREDIT/DEBIT (frontend-only)
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

  const [transactionTypes, setTransactionTypes] = useState([]);
  const [transactionCategories, setTransactionCategories] = useState([]);

  // ----- FETCH TRANSACTIONS WITH FILTERS -----
  const fetchTransactions = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (filters.date) params.append("date", filters.date); // yyyy-MM-dd
      if (filters.category) params.append("category", filters.category); // ADD_MONEY...
      if (filters.minAmount) params.append("minAmount", filters.minAmount);
      if (filters.maxAmount) params.append("maxAmount", filters.maxAmount);

      const url =
        params.toString().length > 0
          ? `transactions/me?${params.toString()}`
          : "transactions/me";

      const res = await AxiosClient(url, "get", null, true);

      if (res?.data) {
        let list = res.data;

        // extra frontend filter by CREDIT/DEBIT if selected
        if (filters.type) {
          const apiType = filters.type.toUpperCase(); // CREDIT/DEBIT
          list = list.filter((t) => t.type === apiType);
        }

        setTransactions(list);
      } else {
        setError(res?.message || "No transactions found");
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  // ----- FETCH META (types + categories) -----
  const fetchTransactionsTypes = async () => {
    setError("");
    try {
      const res = await AxiosClient("transactions/meta", "get", null, true);
      if (res?.data) {
        setTransactionTypes(res.data.types || []); // ["CREDIT","DEBIT"]
        setTransactionCategories(res.data.categories || []); // ["ADD_MONEY"...]
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch transaction types");
    }
  };

  // initial load
  useEffect(() => {
    fetchTransactionsTypes();
  }, []);

  // auto‑fetch when filters change
  useEffect(() => {
    fetchTransactions();
    // safe to disable lint for this simple case
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.date,
    filters.category,
    filters.minAmount,
    filters.maxAmount,
    filters.type,
  ]);

  // ----- TRANSFER FORM VALIDATION -----
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

  // ----- SEND MONEY -----
  const handleSendMoney = async () => {
    if (!validateTransferForm()) return;

    setTransferLoading(true);
    setTransferSuccess("");
    setError("");

    try {
      const payload = {
        accountId: transferForm.accountId,
        amount: parseFloat(transferForm.amount),
        category: transferForm.recipientName, // you may want to change this later
        type: "credit",
        description: transferForm.description,
      };

      const res = await AxiosClient("api/transactions", "post", payload, true);

      if (res && res.message) {
        setTransferSuccess("Money transferred successfully!");
        setTransferForm({
          recipientName: "",
          accountId: "",
          amount: "",
          description: "",
        });
        setValidationErrors({});
        fetchTransactions(); // refresh list
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

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Date */}
          <input
            type="date"
            className="border rounded-lg p-2"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />

          {/* Category */}
          <select
            className="border rounded-lg p-2"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All Categories</option>
            {transactionCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat
                  .toLowerCase()
                  .replace("_", " ")
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>

          {/* Type (frontend only) */}
          <select
            className="border rounded-lg p-2"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            {transactionTypes.map((type) => {
              const value = type.toLowerCase(); // "credit"/"debit"
              const label = type.charAt(0) + type.slice(1).toLowerCase();
              return (
                <option key={type} value={value}>
                  {label}
                </option>
              );
            })}
          </select>

          {/* Min / Max amount */}
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="border rounded-lg p-2 w-1/2"
              value={filters.minAmount}
              onChange={(e) =>
                setFilters({ ...filters, minAmount: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="border rounded-lg p-2 w-1/2"
              value={filters.maxAmount}
              onChange={(e) =>
                setFilters({ ...filters, maxAmount: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Transfer Money */}
      {/* (unchanged except for using handleSendMoney) */}
      {/* ... keep your existing transfer section here ... */}

      {/* Transaction History */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

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
              <li key={t.id} className="py-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">
                    {t.description || t.label || t.category || "Transaction"}
                  </div>
                  {t.date && (
                    <div className="text-xs text-gray-500">
                      {new Date(
                        ...t.date
                          .split("-")
                          .map((v, i) => (i === 1 ? v - 1 : v)),
                      ).toLocaleDateString("en-CA", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  )}
                </div>

                <span
                  className={`font-medium ${
                    t.type === "CREDIT" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === "CREDIT" ? "+" : "-"}
                  {Number(t.amount).toLocaleString("en-CA", {
                    style: "currency",
                    currency: "CAD",
                  })}
                </span>
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
          </div>
        )}
      </div>
    </div>
  );
}
