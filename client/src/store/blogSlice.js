import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NEW_BLOG_URL } from "../Constant";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const postBlog = createAsyncThunk(
  "blog/postblog",
  async (blogData, thunkApi) => {
    try {
      const response = await fetch(NEW_BLOG_URL, {
        method: "POST",
        body: blogData,
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw data;
      else return data;
    } catch (err) {
      console.log(err.message,'message from err');
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: { reset: (state) => (state = initialState) },
  extraReducers: (builder) => {
    builder
      .addCase(postBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(postBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const {reset} = blogSlice.actions
export default blogSlice.reducer
