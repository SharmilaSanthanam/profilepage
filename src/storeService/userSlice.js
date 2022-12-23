import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "./appApi";

const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => initialState,
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
        },
        resetNotifications: (state) => {
            state.notifications.forEach((obj) => {
                obj.status = "read";
            });
        },

    //     updateProducts: (_, action) => {
    //         return action.payload;
    //     },
     },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.signup.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.login.matchFulfilled, (_, { payload }) => payload);
               builder.addMatcher(appApi.endpoints.createProfile.matchFulfilled, (_, { payload }) => payload);
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;