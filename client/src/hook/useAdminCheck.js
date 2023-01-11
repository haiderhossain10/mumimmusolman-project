import decode from "jwt-decode";
import { useSelector } from "react-redux";

export default function useAdminCheck() {
    const { accessToken } = useSelector((state) => state.auth);
    if (accessToken) {
        const user = decode(accessToken);
        if (user.role === "admin") {
            return true;
        }
        return false;
    }
    return false;
}
