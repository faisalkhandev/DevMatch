import { createSlice } from "@reduxjs/toolkit";

const requestSice = createSlice({
    name: 'requests',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        addRequests: (state, action) => {
            const requests = action.payload;

            if (!Array.isArray(requests)) {
                state.error = "Invalid Requests";
                state.loading = false;
                return;
            }

            state.data = [...state.data, ...requests];
            state.loading = false;
            state.error = null;
        },
        removeRequest: (state, action) => {
            const requestIdToRemove = action.payload;
            state.data = state.data.filter(request => request._id !== requestIdToRemove);
        },
    }
});
export const { addRequests, removeRequest } = requestSice.actions;
export default requestSice.reducer;