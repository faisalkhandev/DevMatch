
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './Slice/authSlice'
import feedReducer from './Slice/feedSLice'
import connectionReducer from './Slice/connectionSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer
    },

})


export default appStore