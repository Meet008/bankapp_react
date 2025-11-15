import React from "react";
import {
  Calendar,
  Clock,
  CreditCard,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";

export default function PaymentsPage() {
  const billItems = [
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
  ];

  const recentBills = [
    { id: 1, name: "Electricity Bill", amount: "₹1,200", date: "2025-11-03" },
    { id: 2, name: "Mobile Recharge", amount: "₹249", date: "2025-11-04" },
    { id: 3, name: "Credit Card Bill", amount: "₹5,000", date: "2025-11-07" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Payments & Bills</h1>

      {/* Pay Bills Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Pay Your Bills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {billItems.map((bill) => (
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select className="border rounded-lg p-2">
            <option>Select Bill Type</option>
            <option>Electricity</option>
            <option>Water</option>
            <option>Mobile Recharge</option>
            <option>Internet</option>
            <option>Credit Card</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            className="border rounded-lg p-2"
          />

          <input type="date" className="border rounded-lg p-2" />
        </div>

        <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
          <Calendar className="w-5" /> Schedule Payment
        </button>
      </div>

      {/* Recent Paid Bills */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>

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
      </div>
    </div>
  );
}

const Droplet = (props) => (
  <svg
    {...props}
    className={`w-6 h-6 ${props.className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path>
  </svg>
);
