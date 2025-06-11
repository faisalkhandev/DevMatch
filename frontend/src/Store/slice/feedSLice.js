import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        setFeedLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        addFeedItems: (state, action) => {
            const feedItems = action.payload;

            if (!Array.isArray(feedItems)) {
                state.error = "Invalid feed items";
                state.loading = false;
                return;
            }

            state.data.push(...feedItems);
            state.loading = false;
            state.error = null;
        },

        clearFeed: (state) => {
            state.data = [];
            state.loading = false;
            state.error = null;
        },
    },

})

export const { setFeedLoading, addFeedItems, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;