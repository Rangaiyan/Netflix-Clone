import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Landing from "../pages/LandingPage";
import Register from "../pages/auth/Register";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Register />} />
        <Route path="/register" element={<Login />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
