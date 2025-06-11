import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connections',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        addConnections: (state, action) => {
            const connections = action.payload;

            if (!Array.isArray(connections)) {
                state.error = "Invalid Connections";
                state.loading = false;
                return;
            }

            state.data = [...state.data, ...connections];
            state.loading = false;
            state.error = null;
        },
    }
});

export const { addConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
