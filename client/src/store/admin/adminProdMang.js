import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProdHandler = createAsyncThunk(
  "prodMAng/fetchProdHandler",
  async (arg, thunkApi) => {
    try {
      const res = await fetch();
      const data = await res.json();
      if (!res.ok) throw data;
      else return thunkApi.fulfillWithValue(data);
    } catch (err) {
      thunkApi.rejectWithValue(err.message);
    }
  }
);
