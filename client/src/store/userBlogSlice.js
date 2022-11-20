import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { COMMENT_URL, UPDATE_BLOG_URL, USER_BLOGS_URL } from "../api";

//FETCHing logged in userBlogs

export const fetchUserBlog = createAsyncThunk(
  "userBlog/fetchUserBlog",
  async (a, thunkApi) => {
    try {
      const res = await fetch(USER_BLOGS_URL, { credentials: "include" });
      console.log(res.ok);
      const data = await res.json();
      if (!res.ok) throw data;
      else return data;
    } catch (err) {
      console.error(err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

// DELETing blog

export const deleteBlog = createAsyncThunk(
  "userBlog/deleteBlog",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`${USER_BLOGS_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw data;
      else return id;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

// REMOVing the comments from blog

export const removeComment = createAsyncThunk(
  `userBlog/removeComment`,
  async (id, thunkApi) => {
    try {
      const res = await fetch(`${COMMENT_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

//UPDATEing blog title and content

export const updateBlog = createAsyncThunk(
  "userBlog/updateBlog",
  async (updateData, thunkApi) => {
    try {
      const res = await fetch(UPDATE_BLOG_URL, {
        method: "PUT",
        body: updateData,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const userBlogSlice = createSlice({
  name: "userBlog",
  initialState: {
    userBlogs: [],
    isLoading: false,
    isError: null,
    showComment: false,
    comments: [],
    showUpdateCanvas: false,
    updateData: {},
  },

  reducers: {
    commentHandler: (state, action) => {
      const blog = state.userBlogs.find((blg) => blg._id === action.payload);
      state.comments = blog?.comments;
      state.showComment = true;
    },

    hideComment: (state) => {
      state.showComment = false;
    },

    setUpdateData: (state, action) => {
      const blogId = action.payload;
      const { title, content } = state.userBlogs.find(
        (blog) => blog._id === blogId
      );

      state.showUpdateCanvas = true;
      state.updateData = { title, content, blogId };
    },

    hideUpdateCanvas: (state) => {
      state.showUpdateCanvas = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchUserBlog.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchUserBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.userBlogs = action.payload;
      })

      .addCase(fetchUserBlog.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isError = action.payload;
        state.userBlogs = [];
      })

      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteBlog.fulfilled, (state, action) => {
        const id = action.payload;
        state.isLoading = false;
        state.isError = null;
        state.userBlogs = state.userBlogs.filter((blog) => blog._id !== id);
      })

      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      .addCase(removeComment.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(removeComment.fulfilled, (state, action) => {
        console.log(action.payload);
        const id = action.payload._id;

        state.isLoading = false;
        state.isError = null;
        state.comments = action.payload?.comments;

        state.userBlogs = state.userBlogs.map((blog) =>
          blog._id === id ? action.payload : blog
        );
      })

      .addCase(removeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateBlog.fulfilled, (state, action) => {
        const id = action.payload._id;
        state.isLoading = false;
        state.isError = null;
        state.userBlogs = state.userBlogs.map((blog) =>
          blog._id === id ? action.payload : blog
        );
        state.showUpdateCanvas = false;
      })

      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { commentHandler, hideComment, hideUpdateCanvas, setUpdateData } =
  userBlogSlice.actions;

export default userBlogSlice.reducer;
