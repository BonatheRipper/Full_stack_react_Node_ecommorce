import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "./Store";

export default function ProtectedRoute({ children }) {
  const { user } = useStateContext();
  return user ? children : <Navigate to="/login" />;
}
