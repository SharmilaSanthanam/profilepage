import { createSlice } from "@reduxjs/toolkit";

// appApi
import appApi from "./appApi";

const initialState = [];

export const profileSlice = createSlice({
    name: "profile",
    initialState,
   
    reducers: {
        updateProfile: (_, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.createProfile.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.updateProfile.matchFulfilled, (_, { payload }) => payload);
        // builder.addMatcher(appApi.endpoints.deleteProfile.matchFulfilled, (_, { payload }) => payload);
    },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;