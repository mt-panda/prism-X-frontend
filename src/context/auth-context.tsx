import React, { createContext, useContext } from "react";
import { useAuth as useAuthHook } from "./auth-hook";

/* ---------------- Types ---------------- */
export interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  userRole: "user" | "admin" | null;
  userEmail: string | null;
  login: (
    userId: string,
    userRole: "user" | "admin",
    token: string,
    userEmail: string,
    expirationDate?: Date
  ) => void;
  logout: () => void;
}

/* ---------------- Context ---------------- */
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  userId: null,
  userRole: null,
  userEmail: null,
  login: () => {},
  logout: () => {},
});

/* ---------------- Provider ---------------- */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token, login, logout, userId, userRole, userEmail } = useAuthHook();

  const value: AuthContextType = {
    isLoggedIn: !!token,
    token,
    userId,
    userRole,
    userEmail,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ---------------- Hook ---------------- */
export const useAuth = () => useContext(AuthContext);
