import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("cur_user");
  if (!user) {
    return <Navigate to="/api/login" />;
  }
  return children;
};

export default ProtectedRoute;
