import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ALL_BLOG_URL, NEW_BLOG_URL } from "../api";

const initialState = {
  isSubmitting: false,
  isSubmitted: false,
  isFetching:false,
  isFetched:false,
  isError: false,
  message: "",
  blogs: [],
  totalPages: 0,
  pageNo: 0,
};

//posting new BLOG

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
      console.log(err.message, "message from err");
      return thunkApi.rejectWithValue(err.message);
    }
  }
);


//fetching all blogs from 

export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAllBlogs",
  async (pageNo, thunkApi) => {
    try {
      const response = await fetch(ALL_BLOG_URL + pageNo);

      const { blogs, totalPages } = await response.json();
      console.log(blogs, totalPages);
      return { blogs, totalPages };
    } catch (err) {
      console.log(err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSubmitting = false;
      state.isSubmitted = false;
      state.message = "";
    },
    prevPage: (state) => {
      state.pageNo = Math.max(0, state.pageNo - 1);
    },
    nextPage: (state) => {
      state.pageNo = Math.min(state.totalPages - 1, state.pageNo + 1);
    },
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
    },
  },

  
  extraReducers: (builder) => {
    builder

      .addCase(postBlog.pending, (state) => {
        state.isSubmitting = true;
      })

      .addCase(postBlog.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.isSubmitted = true;
        state.message = action.payload;
      })

      .addCase(postBlog.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSubmitted = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(fetchAllBlogs.pending, (state) => {
        state.isFetching = true;
      })

      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.isFetching = false;
        state.blogs = action.payload.blogs;
        state.totalPages = action.payload.totalPages;
        state.isFetched = true;
        state.isError = false;
      })

      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.isFetching = false;
        state.blogs = [];
        state.totalPages = 0;
        state.isError = true;
        state.isFetched = false;
        state.message = action.payload;
      });
  },
});

export const { reset, nextPage, prevPage, setPageNo } = blogSlice.actions;
export default blogSlice.reducer;
