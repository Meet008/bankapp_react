import React, { useState, useEffect } from "react";

export default function Drawer({
  open,
  onClose,
  title = "Add Money",
  accountInfo = [],
  onSubmit,
}) {
  const accounts = accountInfo?.accounts || [];
  const isSendMoney = title === "Send Money";

  const [formData, setFormData] = useState({
    accountId: "",
    toAccount: "",
    amount: "",
    note: "",
  });

  // default account = CHEQUING
  useEffect(() => {
    if (accounts.length > 0) {
      const chequing = accounts.find((a) => a.type === "CHEQUING");

      setFormData((prev) => ({
        ...prev,
        accountId: chequing?.id || "",
        toAccount: "",
        amount: "",
        note: "",
      }));
    }
  }, [open, accounts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!onSubmit) return;

    if (title === "Add Money") {
      onSubmit({
        accountId: formData.accountId,
        amount: Number(formData.amount),
        note: formData.note,
      });
    } else if (title === "Send Money") {
      onSubmit({
        fromAccountId: formData.accountId,
        toAccount: formData.toAccount,
        amount: Number(formData.amount),
        note: formData.note,
      });
    }
  };

  const handleClose = () => {
    setFormData({
      accountId: "",
      toAccount: "",
      amount: "",
      note: "",
    });
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-xl transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>

          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800 p-2 rounded"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Select Account */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Select Account
              </label>

              <select
                name="accountId"
                value={formData.accountId}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.type} - ${acc.balance.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* To Account (ONLY for Send Money) */}
            {isSendMoney && (
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
            )}

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Amount ($)
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
              {isSendMoney ? "Send Money" : "Add Money"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
