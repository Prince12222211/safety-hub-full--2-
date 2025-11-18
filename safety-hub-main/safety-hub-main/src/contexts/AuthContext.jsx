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
  const [loading, setLoading] = useState(true);

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
      console.warn("Not logged in", err?.message);
      localStorage.removeItem("token");
      setUser(null);
      persistUser(null);
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
    <AuthContext.Provider value={{ user, loading, login, logout, refreshProfile: loadProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
