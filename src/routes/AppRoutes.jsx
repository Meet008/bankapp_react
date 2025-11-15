import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../features/Dashboard/Dashboard";
import Login from "../components/Auth/Login";
import Profile from "../features/Profile/Profile";
import Signup from "../components/Auth/Signup";
import ForgotPassword from "../components/Auth/ForgotPassword";
import MainLayout from "../components/Layout/MainLayout";
import AdminPanel from "../features/Admin/AdminPanel";
import AccountsPage from "../features/Accounts/Account";
import TransactionsPage from "../features/Transaction/Transaction";
import PaymentsPage from "../features/Payments/Payments";
import AnalyticsPage from "../features/AnalyticsReport/AnalyticsReport";
import ProfileSettings from "../features/ProfileSetting/ProfileSetting";
import SupportHelp from "../features/Support/Support";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          // <ProtectedRoute requiredRole={["admin", "manager"]}>
          <MainLayout>
            <Dashboard />
          </MainLayout>
          // </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          // <ProtectedRoute>
          <MainLayout>
            <Profile />
          </MainLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/accounts"
        element={
          // <ProtectedRoute>
          <MainLayout>
            <AccountsPage />
          </MainLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/transaction"
        element={
          // <ProtectedRoute>
          <MainLayout>
            <TransactionsPage />
          </MainLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          // <ProtectedRoute>
          <MainLayout>
            <PaymentsPage />
          </MainLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/analytics-report"
        element={
          // <ProtectedRoute>
          <MainLayout>
            <AnalyticsPage />
          </MainLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/profile-setting"
        element={
          // <ProtectedRoute>
          <MainLayout>
            <ProfileSettings />
          </MainLayout>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          // <ProtectedRoute>
          <MainLayout>
            <SupportHelp />
          </MainLayout>
          // </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AdminPanel />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* You can add more protected routes here */}
    </Routes>
  );
}
