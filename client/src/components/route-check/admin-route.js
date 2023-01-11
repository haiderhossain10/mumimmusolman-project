import decode from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const { accessToken } = useSelector((state) => state.auth);
    if (accessToken) {
        const decoded = decode(accessToken);
        if (decoded.role === "admin") {
            return <Outlet />;
        }
        return <Navigate to="/profile" />;
    }
}
