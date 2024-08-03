import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    isLoggedIn: localStorage.getItem('user') ? true : false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
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
        setLoading: (state, action) => {
            state.loading = action.payload;

        }
    }
})

export const { setCredentials, removeCredentials, setLoading } = userSlice.actions;
export default userSlice.reducer;