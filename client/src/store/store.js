// import {  } from "";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

//creating store

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
