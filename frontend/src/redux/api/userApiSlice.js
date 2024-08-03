// services/api/userApi.js

import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
        }),
        getUserById: builder.query({
            query: (id) => `users/${id}`,
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/users/register',
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: 'users/login',
                method: 'POST',
                body: data,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false, // Set to true if you want to override existing endpoints with the same name
});

export const {
    useGetUsersQuery,
    useLoginMutation,
    useGetUserByIdQuery,
    useRegisterMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
