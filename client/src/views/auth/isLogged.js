import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const IsLogged = () => {
    let token = localStorage.getItem("token");
    if (!token) return <Outlet />;
    return <Navigate to={`/home`} replace={true} />;
};

export default IsLogged;
