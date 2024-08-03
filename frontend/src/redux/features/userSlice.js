import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        user: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        removeCredentials: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem('user');

        },
    },



})

export const { setCredentials, removeCredentials } = userSlice.actions;
export default userSlice.reducer;