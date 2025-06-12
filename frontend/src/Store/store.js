
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './Slice/authSlice'
import feedReducer from './Slice/feedSLice'
import connectionReducer from './Slice/connectionSlice'
import requestReducer from './Slice/requestSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer,
    },

})


export default appStore