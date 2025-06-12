
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slice/authSlice'
import feedReducer from './slice/feedSLice'
import connectionReducer from './slice/connectionSlice'
import requestReducer from './slice/requestSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer,
    },

})


export default appStore