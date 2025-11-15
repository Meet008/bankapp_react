import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // optional for async

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Dummy login
      await new Promise((res) => setTimeout(res, 500));
      if (email === "admin@test.com" && password === "123456") {
        setUser({ name: "Admin User", email, role: "Admin" });
      } else {
        throw new Error("Invalid credentials");
      }
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
      value={{ user, login, logout, signup, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
