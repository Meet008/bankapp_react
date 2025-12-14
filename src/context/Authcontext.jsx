import React, { createContext, useContext, useState } from "react";
import { AxiosClient } from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [loading, setLoading] = useState(false); // optional for async

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await AxiosClient("auth/login", "post", {
        email,
        password,
      });

      if (!response || response.message) {
        throw new Error(response?.message || "Invalid credentials");
      }

      // example response handling
      localStorage.setItem("user", JSON.stringify(response?.user));
      localStorage.setItem("role", response?.user?.role);
      localStorage.setItem("user_id", response?.user?.id);
      setUser(response?.user);
      setRole(response?.user?.role); // or response.user.role;

      // optional token storage
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 500));
      setUser({ name, email, role: "User" });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        role,
        login,
        logout,
        signup,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
