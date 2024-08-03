import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice";
import userSlice from "./features/userSlice.js"

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),

})

export default store;