import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  CreditCard,
  Smartphone,
  Wifi,
  Zap,
  Droplet,
} from "lucide-react";
import { AxiosClient } from "../../api/axiosClient";

export default function PaymentsPage() {
  const [billItems, setBillItems] = useState([
    {
      id: 1,
      name: "Electricity Bill",
      icon: <Zap className="text-yellow-600" />,
    },
    { id: 2, name: "Water Bill", icon: <Droplet className="text-blue-600" /> },
    {
      id: 3,
      name: "Mobile Recharge",
      icon: <Smartphone className="text-indigo-600" />,
    },
    {
      id: 4,
      name: "Internet / WiFi",
      icon: <Wifi className="text-purple-600" />,
    },
    {
      id: 5,
      name: "Credit Card Bill",
      icon: <CreditCard className="text-red-600" />,
    },
  ]);

  const [recentBills, setRecentBills] = React.useState([
    { id: 1, name: "Electricity Bill", amount: "₹1,200", date: "2025-11-03" },
    { id: 2, name: "Mobile Recharge", amount: "₹249", date: "2025-11-04" },
    { id: 3, name: "Credit Card Bill", amount: "₹5,000", date: "2025-11-07" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [scheduleForm, setScheduleForm] = useState({
    billType: "",
    amount: "",
    scheduledDate: "",
  });
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState("");

  const handleSchedulePayment = async () => {
    setScheduleLoading(true);
    setScheduleSuccess("");
    setError("");

    try {
      const payload = {
        billType: scheduleForm.billType,
        amount: parseFloat(scheduleForm.amount),
        scheduledDate: scheduleForm.scheduledDate,
        userId: localStorage.getItem("user_id"),
      };

      const res = await AxiosClient("payments", "post", payload, true);
      console.log("Schedule payment response:", res);

      if (res && res.message) {
        setScheduleSuccess("Payment scheduled successfully!");
        setScheduleForm({ billType: "", amount: "", date: "" });
      } else {
        setError(res?.message || "Failed to schedule payment");
      }
    } catch (err) {
      setError(err?.message || "Failed to schedule payment");
    } finally {
      setScheduleLoading(false);
    }
  };

  const fetchPayments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await AxiosClient(
        `payments/user/${localStorage.getItem("user_id")}`,
        "get",
        null,
        true
      );
      if (res) {
        setBillItems(res.payments);
      } else {
        setError(res?.message || "No payments found");
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Payments & Bills</h1>

      {/* Pay Bills Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Pay Your Bills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {loading
            ? [1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-5 shadow flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-20 mt-2 animate-pulse" />
                </div>
              ))
            : billItems.map((bill) => (
                <div
                  key={bill.id}
                  className="bg-gray-50 rounded-xl p-5 shadow cursor-pointer hover:bg-gray-100 transition flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 bg-white shadow rounded-full flex items-center justify-center">
                    {bill.icon}
                  </div>
                  <p className="font-medium text-center">{bill.name}</p>
                </div>
              ))}
        </div>
      </div>

      {/* Schedule Payments */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="text-green-600" /> Schedule a Payment
        </h2>

        {scheduleSuccess && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            {scheduleSuccess}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={scheduleForm.billType}
            onChange={(e) =>
              setScheduleForm({ ...scheduleForm, billType: e.target.value })
            }
            className="border rounded-lg p-2"
          >
            <option value="">Select Bill Type</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Mobile Recharge">Mobile Recharge</option>
            <option value="Internet">Internet</option>
            <option value="Credit Card">Credit Card</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={scheduleForm.amount}
            onChange={(e) =>
              setScheduleForm({ ...scheduleForm, amount: e.target.value })
            }
            className="border rounded-lg p-2"
          />

          <input
            type="date"
            value={scheduleForm.scheduledDate}
            onChange={(e) =>
              setScheduleForm({
                ...scheduleForm,
                scheduledDate: e.target.value,
              })
            }
            className="border rounded-lg p-2"
          />
        </div>

        <button
          onClick={handleSchedulePayment}
          disabled={
            scheduleLoading ||
            !scheduleForm.billType ||
            !scheduleForm.amount ||
            !scheduleForm.date
          }
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 disabled:bg-gray-400"
        >
          <Calendar className="w-5" />{" "}
          {scheduleLoading ? "Scheduling..." : "Schedule Payment"}
        </button>
      </div>

      {/* Recent Paid Bills */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>

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
        ) : recentBills && recentBills.length > 0 ? (
          <ul className="divide-y">
            {recentBills.map((bill) => (
              <li
                key={bill.id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{bill.name}</p>
                  <p className="text-gray-500 text-sm">{bill.date}</p>
                </div>

                <p className="text-indigo-600 font-semibold">{bill.amount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-8 flex flex-col items-center text-center">
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
              No recent payments
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You have no recent payments to display.
            </p>
            <button
              onClick={fetchPayments}
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
