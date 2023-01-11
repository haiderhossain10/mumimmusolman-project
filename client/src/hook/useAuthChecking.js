import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAccessToken } from "../features/auth/authSlice";

export default function useAuthChecking() {
    const [isAuth, setIsAuth] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("_logged");
        if (token) {
            const localAuth = JSON.parse(token);
            dispatch(addAccessToken(localAuth.accessToken));
        }
        setIsAuth(true);
    }, [dispatch, setIsAuth]);
    return isAuth;
}
