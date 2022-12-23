import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./storeService/profileSlice";
import userSlice from "./storeService/userSlice";
import appApi from "./storeService/appApi";

// to persist in our store after closing and opening again
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

//reducers
const reducer = combineReducers({
    user: userSlice,
    profile: profileSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath, "users"],
};

// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
});

export default store;