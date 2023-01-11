import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addAccessToken: (state, { payload }) => {
            state.accessToken = payload;
        },
        clearTokens: (state) => {
            state.accessToken = null;
        },
    },
});

export const { addAccessToken, clearTokens } = authSlice.actions;
export default authSlice.reducer;
