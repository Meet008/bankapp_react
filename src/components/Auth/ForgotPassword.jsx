import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosClient } from "../../api/axiosClient";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(""); // ← REPLACE otp
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Send Token (your /api/password/request)
  const handleSendToken = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await AxiosClient("password/request", "post", { email });

      if (data?.success === true) {
        if (!data.token) {
          setError("Token missing in response");
        } else {
          setToken(data.token);
          setStep(2);
          setSuccess(data.message || "Token received! Enter new password.");
        }
      } else {
        setError(data?.message || "Failed to send token");
      }
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message || err?.message || "Network error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password (your /api/password/reset)
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be 6+ chars");
      return;
    }
    if (!token) {
      setError("Token missing");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // If AxiosClient returns response.data:
      const data = await AxiosClient("password/reset", "post", {
        token, // from state (set in handleSendToken)
        newPassword, // from input
      });

      if (data?.success === true) {
        setSuccess(data.message || "Password reset successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data?.message || "Reset failed");
      }
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message || err?.message || "Network error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            {success}
          </div>
        )}

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleSendToken} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? "Sending..." : "Send Reset Token"}
            </button>
          </form>
        )}

        {/* Step 2: Reset (no OTP input needed) */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New secure password"
                required
                disabled={loading}
              />
            </div>
            <div className="text-sm text-gray-500">
              Token ready: {token.slice(0, 8)}...
            </div>
            <button
              type="submit"
              disabled={loading || !newPassword}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 transition"
            >
              {loading ? "Reset..." : "Reset Password"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-gray-600 text-sm">
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}
