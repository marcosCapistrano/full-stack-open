import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function LoginGuard({ session, setSession }) {
  useEffect(() => {
    if (!session) {
      const token = window.localStorage.getItem("session");
      if (token) setSession(token);
    }
  }, []);

  return session ? <Outlet /> : <Navigate to="/" replace />;
}
