import { api } from "../api/api";
import { addAccessToken } from "./authSlice";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem(
                        "_logged",
                        JSON.stringify({
                            accessToken: data.accessToken,
                        })
                    );
                    dispatch(addAccessToken(data.accessToken));
                } catch (error) {}
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
