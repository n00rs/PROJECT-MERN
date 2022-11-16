import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_PRODUCTS_URL } from "../Constant";

const initialState = { products: [], isLoading: false, error: "", pageNo: 0, totalPages: 0 };

export const fetchProduct = createAsyncThunk("fetchProduct/shop", async (category, thunkApi) => {
  try {
    // console.log(data, "dATA");
    // const { pageNo, category } = data;
    const { shop } = thunkApi.getState();
    console.log(shop["pageNo"]);
    const res = await fetch(FETCH_PRODUCTS_URL + "?page=" + shop.pageNo + "&category=" + category);
    const resData = await res.json();

    if (!res.ok) throw resData;
    else return thunkApi.fulfillWithValue(resData);
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err.message);
  }
});

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    resetProd: (state) => {
      state.products = [];
    },
    setPageNo: (state) => {
      state.pageNo = state.pageNo + 1;
    },
    resetPageNo: (state) => {
      state.pageNo = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.error = null;
        state.totalPages = action.payload.metaData[0]?.totalPages;
        state.products = [...state.products, ...action.payload.data];
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProd, setPageNo, resetPageNo } = shopSlice.actions;
export default shopSlice.reducer;
