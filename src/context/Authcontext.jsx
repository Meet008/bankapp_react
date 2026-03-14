import React, { createContext, useContext, useState, useEffect } from "react";
import { AxiosClient } from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
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

  const redirectAfterAuth = (userRole) => {
    if (userRole === "ADMIN") {
      navigate("/admin-panel", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await AxiosClient("auth/login", "post", {
        email,
        password,
      });

      if (!response) {
        throw new Error(response?.message || "Invalid credentials");
      }

      // example response handling
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem("role", response?.data?.user?.role);
      localStorage.setItem("user_id", response?.data?.user?.id);
      setUser(response?.data?.user);
      setRole(response?.data?.user?.role); // or response.user.role;

      redirectAfterAuth(response?.data?.user?.role);

      if (response?.data?.token) {
        // optional token storage
        localStorage.setItem("token", response?.data?.token);
      }

      return response;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Try again.";
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({
    name,
    email,
    password,
    phone,
    address,
    avatarUrl,
  }) => {
    setLoading(true);

    try {
      const data = await AxiosClient("auth/register", "post", {
        name,
        email,
        password,
        phone,
        address,
        avatarUrl,
      });

      const userDto = data.data;
      setUser({
        id: userDto.user.id,
        name: userDto.user.name,
        email: userDto.user.email,
        role: userDto.user.role,
        avatarUrl: userDto.user.avatarUrl,
      });

      localStorage.setItem("user", JSON.stringify(userDto.user));
      localStorage.setItem("role", userDto.user.role);
      localStorage.setItem("user_id", userDto.user.id);

      setRole(userDto.user.role); // or response.user.role;
      redirectAfterAuth(data?.data?.user?.role);

      if (data?.data?.token) {
        // optional token storage
        localStorage.setItem("token", data?.data?.token);
      }

      return data;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed. Try again.";
      throw new Error(msg);
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
    localStorage.removeItem("user_id");
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
