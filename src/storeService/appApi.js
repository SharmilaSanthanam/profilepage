import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create the api

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://profile-zvxb.onrender.com" }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),
        // creating profile
        createProfile: builder.mutation({
            query: (profile) => ({
                url: "/profiles",
                body: profile,
                method: "POST",
            }),
        }),

        updateProfile: builder.mutation({
            query: (profile) => ({
                url: `/profiles/${profile.id}`,
                body: profile,
                method: "PATCH",
            }),
        }),

        // deleteProfile: builder.mutation({
        //     query: ({ profile_id, user_id }) => ({
        //         url: `/profiles/${profile_id}`,
        //         body: {
        //             user_id,
        //         },
        //         method: "DELETE",
        //     }),
        // }),

      

        // create profile
        // createProfile: builder.mutation({
        //     query: (body) => ({
        //         url: "/profiles",
        //         method: "POST",
        //         body,
        //     }),
        // }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useCreateProfileMutation,
    // useCreateOrderMutation,
    // useDeleteProfileMutation,
    useUpdateProfileMutation,
} = appApi;

export default appApi;
