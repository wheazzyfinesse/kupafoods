import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get token from localStorage
const getToken = () => localStorage.getItem("token");

const baseQuery = fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/",
    baseUrl: "https://kupafoods-server.vercel.app/api/",
    prepareHeaders: (headers) => {
        const token = getToken();
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
    },
    credentials: "include",
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
});