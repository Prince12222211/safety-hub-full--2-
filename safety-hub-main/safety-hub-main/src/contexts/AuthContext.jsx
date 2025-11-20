import { createContext, useCallback, useEffect, useState } from "react";
import { getProfile } from "../services/authService";

export const AuthContext = createContext();

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn("Failed to parse stored user", error);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(false); // 👈 Important: do NOT block UI on load

  const persistUser = (profile) => {
    if (profile) {
      localStorage.setItem("user", JSON.stringify(profile));
    } else {
      localStorage.removeItem("user");
    }
  };

  const loadProfile = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      persistUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data = await getProfile();
      setUser(data);
      persistUser(data);
    } catch (err) {
      console.warn("Backend not reachable or not logged in:", err?.message);

      // ❗ FIX: Do NOT clear user/token if backend is offline
      // Only clear if backend returns 401
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        persistUser(null);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const login = (token, profile) => {
    localStorage.setItem("token", token);
    persistUser(profile);
    setUser(profile);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    persistUser(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshProfile: loadProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
