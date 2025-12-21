import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../features/Dashboard/Dashboard";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import ForgotPassword from "../components/Auth/ForgotPassword";

import Profile from "../features/Profile/Profile";
import MainLayout from "../components/Layout/MainLayout";
import AdminPanel from "../features/Admin/AdminPanel";
import AccountsPage from "../features/Accounts/Account";
import TransactionsPage from "../features/Transaction/Transaction";
import PaymentsPage from "../features/Payments/Payments";
import AnalyticsPage from "../features/AnalyticsReport/AnalyticsReport";
import ProfileSettings from "../features/ProfileSetting/ProfileSetting";
import SupportHelp from "../features/Support/Support";
import UsersPage from "../features/Users/Users";

export default function AppRoutes() {
  const isAuth = !!localStorage.getItem("token");

  const roles = ["ADMIN", "CUSTOMER"];

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/signup"
        element={isAuth ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/forgot-password"
        element={isAuth ? <Navigate to="/" /> : <ForgotPassword />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRole={roles}>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute requiredRole={roles}>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/accounts"
        element={
          <ProtectedRoute requiredRole={roles}>
            <MainLayout>
              <AccountsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/transaction"
        element={
          <ProtectedRoute requiredRole={roles}>
            <MainLayout>
              <TransactionsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute requiredRole={roles}>
            <MainLayout>
              <PaymentsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics-report"
        element={
          <ProtectedRoute requiredRole={roles}>
            <MainLayout>
              <AnalyticsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile-setting"
        element={
          <ProtectedRoute requiredRole={roles}>
            <MainLayout>
              <ProfileSettings />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/support"
        element={
          <ProtectedRoute requiredRole={roles}>
            <MainLayout>
              <SupportHelp />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute requiredRole={roles}>
            <MainLayout>
              <UsersPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ADMIN"
        element={
          <ProtectedRoute requiredRole={["ADMIN"]}>
            <MainLayout>
              <AdminPanel />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
