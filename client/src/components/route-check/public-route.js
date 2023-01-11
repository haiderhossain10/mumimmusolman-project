import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

export default function PublicRoute() {
    const isAuthenticated = useAuth();
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
