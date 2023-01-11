import { useSelector } from "react-redux";

export default function useAuth() {
    const { accessToken } = useSelector((state) => state.auth);
    if (accessToken) {
        return true;
    }
    return false;
}
