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
import { useAuth } from "../context/Authcontext";
import PageNotFound from "../features/PageNotFound/PageNotFound";

export default function AppRoutes() {
  const { user } = useAuth();

  const roles = ["ADMIN", "CUSTOMER"];

  const adminRoutes = [
    {
      path: "/",
      element: <Dashboard />,
      roles: ["ADMIN"],
    },
    {
      path: "/admin-panel",
      element: <AdminPanel />,
      roles: ["ADMIN"],
    },
    {
      path: "/users",
      element: <UsersPage />,
      roles: ["ADMIN"],
    },
  ];

  const customerRoutes = [
    {
      path: "/",
      element: <Dashboard />,
      roles: ["CUSTOMER"],
    },
    {
      path: "/profile",
      element: <Profile />,
      roles: ["CUSTOMER"],
    },
    {
      path: "/accounts",
      element: <AccountsPage />,
      roles: ["CUSTOMER"],
    },
    {
      path: "/transaction",
      element: <TransactionsPage />,
      roles: ["CUSTOMER"],
    },
    {
      path: "/payments",
      element: <PaymentsPage />,
      roles: ["CUSTOMER"],
    },
    {
      path: "/analytics-report",
      element: <AnalyticsPage />,
      roles: ["CUSTOMER"],
    },
    {
      path: "/profile-setting",
      element: <ProfileSettings />,
      roles: ["CUSTOMER"],
    },
    {
      path: "/support",
      element: <SupportHelp />,
      roles: ["CUSTOMER"],
    },
  ];

  const role = localStorage.getItem("role");

  const allowedRoutes = role === "ADMIN" ? adminRoutes : customerRoutes;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
      <Route
        path="/forgot-password"
        element={user ? <Navigate to="/" /> : <ForgotPassword />}
      />
      {/* 🔐 Protected Routes */}
      {allowedRoutes.map(({ path, element, roles }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute requiredRole={roles}>
              <MainLayout>{element}</MainLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {/* Fallback */}
      <Route
        path="*"
        element={
          <MainLayout>
            <PageNotFound />
          </MainLayout>
        }
      />
    </Routes>
  );
}
