import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

export default function PrivateRoute() {
    const isAuthenticated = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
