import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-toastify";
function AdminProtectedRoute() {
    const { token, role } = useAuth();
    if (!token || role !== "admin") {
        toast.error("you are Unauthorised", {
            autoClose: 3000,
        });
        setTimeout(() => {
            return <Navigate to="/" />
        }, 3000);

    }
    return <Outlet />
}
export default AdminProtectedRoute;