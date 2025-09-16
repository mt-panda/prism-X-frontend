import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context.tsx";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
