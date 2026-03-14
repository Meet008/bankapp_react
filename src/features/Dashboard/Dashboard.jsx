import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Plus,
  Wallet,
  CreditCard,
  ArrowDown,
  ArrowDownRight,
  ArrowDownLeft,
} from "lucide-react";
import { AxiosClient } from "../../api/axiosClient";
import Drawer from "../../components/Layout/Drawer";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const [drawerTitle, setDrawerTitle] = useState("Add Money");

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await AxiosClient(
        `dashboard/summary/${localStorage.getItem("user_id")}`,
        "get",
        null,
        true,
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

  const handleAddMoney = () => {
    setDrawerTitle("Add Money");
    setIsDrawerOpen(true);
  };

  const handleSendMoney = () => {
    setDrawerTitle("Send Money");
    setIsDrawerOpen(true);
  };
  const handleDrawerSubmit = async (payload) => {
    try {
      if (drawerTitle === "Add Money") {
        await AxiosClient(
          "transactions/add-money",
          "post",
          {
            accountId: payload.accountId,
            amount: payload.amount,
            note: payload.note,
          },
          true,
        );
      } else if (drawerTitle === "Send Money") {
        await AxiosClient(
          "transactions/send-money",
          "post",
          {
            fromAccountId: payload.fromAccountId,
            toAccountNumber: payload.toAccount,
            amount: payload.amount,
            note: payload.note,
          },
          true,
        );
      }

      await fetchDashboardData(); // refresh balances & transactions
      setIsDrawerOpen(false); // close drawer
    } catch (err) {
      console.error("Add money failed:", err);
      // optionally set some error state or toast
    }
  };

  const upcomingPayments = [
    {
      id: 1,
      description: "Hydro Bill",
      amount: 82.45,
      dueDate: "2026-03-18",
    },
    {
      id: 2,
      description: "Internet - Rogers",
      amount: 65.99,
      dueDate: "2026-03-20",
    },
    {
      id: 3,
      description: "Phone - Fido",
      amount: 54.2,
      dueDate: "2026-03-22",
    },
    {
      id: 4,
      description: "Rent",
      amount: 950,
      dueDate: "2026-04-01",
    },
  ];

  return (
    <>
      {" "}
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Accounts</h1>

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
              {/* Chequings  */}
              <div className="bg-white p-5 rounded-xl shadow">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-500">Chequing</h2>
                  <Wallet className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-3xl font-semibold mt-2">
                  ${data?.chequing ?? "₹0.0"}
                </p>
              </div>

              {/* Saving */}
              <div className="bg-white p-5 rounded-xl shadow">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-500">Saving</h2>
                  <ArrowUpRight className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-3xl font-semibold mt-2">
                  ${data?.savings ?? "₹0.0"}
                </p>
              </div>

              {/* Expenses */}
              <div className="bg-white p-5 rounded-xl shadow">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-500">Monthly Expenses</h2>
                  <ArrowDown className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-3xl font-semibold mt-2">
                  ${data?.expenses ?? "₹0.0"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => handleAddMoney()}
            className="bg-green-600 text-white py-3 rounded-xl flex flex-col items-center shadow hover:bg-green-700 transition"
          >
            <ArrowDownLeft className="w-6 h-6 mb-1" />
            Add Money
          </button>
          <button
            onClick={() => handleSendMoney()}
            className="bg-blue-600 text-white py-3 rounded-xl flex flex-col items-center shadow hover:bg-blue-700 transition"
          >
            <ArrowUpRight className="w-6 h-6 mb-1" />
            Send Money
          </button>

          <button
            onClick={() => navigate("/payments")}
            className="bg-orange-600 text-white py-3 rounded-xl flex flex-col items-center shadow hover:bg-orange-700 transition"
          >
            <CreditCard className="w-6 h-6 mb-1" />
            Pay a Bill
          </button>

          <button
            onClick={() => navigate("/accounts")}
            className="bg-indigo-600 text-white py-3 rounded-xl flex flex-col items-center shadow hover:bg-indigo-700 transition"
          >
            <Wallet className="w-6 h-6 mb-1" />
            View Accounts
          </button>
        </div>

        {/* Recent Transactions + Upcoming Payments */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Recent Transactions */}
          <div className="flex flex-col w-full lg:w-1/2">
            <h2 className="text-xl font-semibold mt-10 mb-3">
              Recent Transactions
            </h2>

            <div className="bg-white p-5 rounded-xl shadow">
              {loading ? (
                <ul className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <li
                      key={i}
                      className="py-3 flex justify-between items-center"
                    >
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
              ) : data?.recentTransactions &&
                data.recentTransactions.length > 0 ? (
                <ul className="divide-y">
                  {data.recentTransactions.map((t) => (
                    <li
                      key={t.id}
                      className="py-4 flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">
                          {t.description ||
                            t.label ||
                            t.category ||
                            "Transaction"}
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
                          t.type === "CREDIT"
                            ? "text-green-600"
                            : "text-red-600"
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
                <div className="py-12 flex flex-col items-center text-center">
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

          {/* Upcoming Payments */}
          <div className="flex flex-col w-full lg:w-1/2">
            <h2 className="text-xl font-semibold mt-10 mb-3">
              Upcoming Payments
            </h2>

            <div className="bg-white p-5 rounded-xl shadow min-h-[200px]">
              <ul className="divide-y">
                {upcomingPayments.map((bill) => (
                  <li
                    key={bill.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{bill.description}</div>

                      <div className="text-xs text-gray-500">
                        Due{" "}
                        {new Date(bill.dueDate).toLocaleDateString("en-CA", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <span className="font-medium text-red-600">
                      {Number(bill.amount).toLocaleString("en-CA", {
                        style: "currency",
                        currency: "CAD",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        open={isDrawerOpen}
        title={drawerTitle}
        accountInfo={data}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleDrawerSubmit}
      />
    </>
  );
}
