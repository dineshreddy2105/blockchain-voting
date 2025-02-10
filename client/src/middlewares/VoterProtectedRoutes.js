import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-toastify";
function VoterProtectedRoute() {
    const { token, role } = useAuth();
    if (!token || role !== "voter") {
        toast.error("Please Login", {
            autoClose: 3000,
        });
        setTimeout(() => {
            return <Navigate to="/" />
        }, 3000);

    }
    return <Outlet />
}
export default VoterProtectedRoute;