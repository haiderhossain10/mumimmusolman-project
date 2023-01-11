import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearTokens, addAccessToken } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API,
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
        const token = getState()?.auth?.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const api = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);
        if (result?.error?.status === 401) {
            const refreshToken = await baseQuery(
                {
                    url: "/refresh-token",
                    method: "POST",
                },
                api,
                extraOptions
            );
            if (refreshToken?.data) {
                localStorage.setItem(
                    "_logged",
                    JSON.stringify({
                        accessToken: refreshToken.data.accessToken,
                    })
                );
                api.dispatch(addAccessToken(refreshToken.data.accessToken));
            }
            if (refreshToken?.error?.status === 404) {
                api.dispatch(clearTokens());
                localStorage.clear();
                window.location.href("/login");
            }
        }

        return result;
    },
    endpoints: () => ({}),
});
