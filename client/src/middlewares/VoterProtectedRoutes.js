import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-toastify";
function VoterProtectedRoute() {
    const { token, role } = useAuth();
    if (!token || role !== "user") {
        console.log(token,role)
        toast.error("you are Unauthorised", {
            autoClose: 2000,
        });
        setTimeout(() => {
            return <Navigate to="/" />
        }, 2000);

    }
    return <Outlet />
}
export default VoterProtectedRoute;