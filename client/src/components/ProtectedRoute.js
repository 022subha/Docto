import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (!Cookies.get("token")) {
    console.log(Cookies.get("token"));
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
