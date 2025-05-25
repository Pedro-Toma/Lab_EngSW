import React from "react";
import { Navigate,Outlet } from "react-router-dom";

function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

function isTokenExpired(decodedToken) {
    if (!decodedToken || !decodedToken.exp) return true;
    return decodedToken.exp * 1000 < Date.now();
}

function ProtectedRoute() {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/Login" replace />;
    }

    const decoded = parseJwt(token);

    if (!decoded || isTokenExpired(decoded)) {
        localStorage.removeItem("token");
        return <Navigate to="/Login" replace />;
    }

    return <Outlet />; 
}

export default ProtectedRoute;
