import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation,Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";
import Landing from "../pages/LandingPage";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Admin from "../Admin/Add";

import { getToken, getUserInfo } from "../utils/authUtils";

function AppRoutes() {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("accessToken"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const token = getToken();
  const ProtectedRoutes = () => {
  return (
    token ? <Outlet/> : <Navigate to='/login' replace/>
    )
  }
  const AdminRoutes=()=>{
    return (
    isAuth ? <Outlet/> : <Navigate to='/login' replace/>
    )
  }
  useEffect(() => {
    setIsAuth(!!localStorage.getItem("accessToken"));
  }, [location]);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      <Route element={<ProtectedRoutes/>}>
              <Route path='/home' element={<Home/>} />        
      </Route>
      <Route element={<AdminRoutes/>}>
              <Route path='/admin' element={<Admin/>} />        
      </Route>
      

      <Route path="*" element={<Navigate to={isAuth ? "/home" : "/login"} replace />} />
    </Routes>
  );
}

export default AppRoutes;
