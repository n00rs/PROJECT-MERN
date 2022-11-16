// import {  } from "";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import blogReducer from "./blogSlice";
import shopSlice from "./shopSlice";
import userBlogSlice from "./userBlogSlice";

//creating store

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    userBlog: userBlogSlice,
    shop:shopSlice
  },
});
