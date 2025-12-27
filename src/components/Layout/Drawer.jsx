import React, { useState } from "react";

export default function Drawer({ open, onClose, title = "Money Transfer" }) {
  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    transferType: "IMPS",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transfer Data:", formData);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-xl transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 p-2 rounded"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* From Account */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                From Account
              </label>
              <input
                type="text"
                name="fromAccount"
                placeholder="Enter sender account number"
                value={formData.fromAccount}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* To Account */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                To Account
              </label>
              <input
                type="text"
                name="toAccount"
                placeholder="Enter receiver account number"
                value={formData.toAccount}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Transfer Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Transfer Type
              </label>
              <select
                name="transferType"
                value={formData.transferType}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="IMPS">IMPS</option>
                <option value="NEFT">NEFT</option>
                <option value="RTGS">RTGS</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Note (Optional)
              </label>
              <textarea
                name="note"
                rows="3"
                placeholder="Add a note"
                value={formData.note}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Transfer Money
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
