import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Landing from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProfileSetup from "../pages/ProfileSetup/ProfileDetails";
//import Languages from "../pages/ProfileSetup/LanguagePreference";
//import Genres from "../pages/ProfileSetup/Genre";
import Home from "../pages/Home";
import Admin from "../Admin/Add";

function AppRoutes() {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("accessToken"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [isNewUser, setIsNewUser] = useState(localStorage.getItem("isNewUser") === "true");

  const ProtectedRoutes = () => {
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
  };

  const AdminRoutes = () => {
    return isAuth && isAdmin ? <Outlet /> : <Navigate to="/home" replace />;
  };

  const OnboardingRoutes = () => {
    return isAuth && isNewUser ? <Outlet /> : <Navigate to="/home" replace />;
  };

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("accessToken"));
    setIsNewUser(localStorage.getItem("isNewUser") === "true");
  }, [location]);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* Onboarding process for new users */}
      <Route element={<OnboardingRoutes />}>
        <Route path="/profile-setup" element={<ProfileSetup />} />
        {/*<Route path="/languages" element={<Languages />} />
        <Route path="/genres" element={<Genres />} />
      */}</Route>

      {/* Protected routes for authenticated users */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* Redirect users based on their status */}
      <Route path="*" element={<Navigate to={isAuth ? (isNewUser ? "/profile-setup" : "/home") : "/login"} replace />} />
    </Routes>
  );
}

export default AppRoutes;
