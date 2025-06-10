import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        addUser: (state, action) => {
            const userData = action.payload;

            if (!userData || typeof userData !== "object") {
                state.error = "Invalid user data";
                state.loading = false;
                return;
            }

            state.data = userData;
            state.loading = false;
            state.error = null;
        },

        setUserError: (state, action) => {
            state.loading = false;
            state.error = action.payload || "Unknown error";
        },

        removeUser: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { addUser, removeUser, setUserLoading, setUserError } = userSlice.actions;

export default userSlice.reducer;
