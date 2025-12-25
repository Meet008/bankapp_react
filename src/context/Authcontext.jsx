import React, { createContext, useContext, useState, useEffect } from "react";
import { AxiosClient } from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [loading, setLoading] = useState(false); // optional for async
  const navigate = useNavigate();

  // Sync auth state when storage changes (e.g., logout in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      const storedRole = localStorage.getItem("role");

      if (!storedUser) {
        setUser(null);
        setRole(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await AxiosClient("auth/login", "post", {
        email,
        password,
      });
      console.log("Login response:", response);
      if (!response) {
        throw new Error(response?.message || "Invalid credentials");
      }

      // example response handling
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem("role", response?.data?.user?.role);
      localStorage.setItem("user_id", response?.data?.user?.id);
      setUser(response?.data?.user);
      setRole(response?.data?.user?.role); // or response.user.role;

      // optional token storage
      if (response?.data?.token) {
        localStorage.setItem("token", response?.data?.token);
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

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
