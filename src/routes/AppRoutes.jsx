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
