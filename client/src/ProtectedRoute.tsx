import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/auth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/public" />;
  }

  return <>{children}</>;
};
