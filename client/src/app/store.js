import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});
