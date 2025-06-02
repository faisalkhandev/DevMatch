
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slice/authSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer
    },

})


export default appStore