
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './Slice/authSlice'
import feedReducer from './Slice/feedSLice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer
    },

})


export default appStore