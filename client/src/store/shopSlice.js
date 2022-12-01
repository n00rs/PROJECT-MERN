import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FETCH_PRODUCTS_URL, CART_API, CART_COUNT_API } from "../api";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  pageNo: 0,
  totalPages: 0,
  cartCount: 0,
  cart: null,
  updatingCart: false,
  fetchingCart: false,
  orderDetails: {
    cartId: "",
    addressId: "",
    couponCode: "",
  },
  userData: "",
};



//FETCHING PRODUCTS


export const fetchProduct = createAsyncThunk("fetchProduct/shop", async (category, thunkApi) => {
  try {
    const { shop } = thunkApi.getState();
    // console.log(shop["pageNo"]);
    const res = await fetch(FETCH_PRODUCTS_URL + "?page=" + shop.pageNo + "&category=" + category);
    const resData = await res.json();

    if (!res.ok) throw resData;
    else return thunkApi.fulfillWithValue(resData);
  } catch (err) {
    console.log(err, "errr");
    return thunkApi.rejectWithValue(err.message);
  }
});

// UPDATING CARTiTEMS (ADD ,REMOVE)

export const updateCart = createAsyncThunk(
  "updateCart/shop",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await fetch(CART_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const resData = await res.json();

      if (!res.ok) throw resData;
      data.cartCount = resData?.items?.length;
      console.log(data);
      return fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

// CART COUNT FOR NAV CART ICON

export const fetchCartCount = createAsyncThunk(
  "fetchCartCount/shop",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await fetch(CART_COUNT_API, { credentials: "include" });
      const resData = await res.json();

      if (!res.ok) throw resData;
      return fulfillWithValue(resData);
    } catch (err) {
      console.error(err, "cartCount");
      return rejectWithValue(err.message);
    }
  }
);

//FETCHING CART OF LOGGEDIN USER

export const fetchCartItems = createAsyncThunk(
  "fetchCartItems/shop",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await fetch(CART_API, { credentials: "include" });
      const resData = await res.json();
      if (!res.ok) throw resData;
      return fulfillWithValue(resData);
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    sortProd: (state, action) => {
      console.log(action);
      switch (action.payload) {
        case "PRICE_ASCE":
          state.products = state.products.sort((a, b) => b.price - a.price);
          break;
        case "PRICE_DESC":
          state.products = state.products.sort((a, b) => a.price - b.price);
          break;
        case "NAME":
          state.products = state.products.sort((a, b) =>
            a.productName.localeCompare(b.productName)
          );
          break;
        default:
          console.log("inside log");
          state.products = state.products.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
      }
      // if ( === "PRICE_ASCE")
      //   if (action.payload === "PRICE_DESC")
      //     state.products = state.products.sort((a, b) => a.price - b.price);

      // if (action.payload === "NAME")
    },
    resetProd: (state) => {
      state.products = [];
    },

    setPageNo: (state) => {
      state.pageNo = state.pageNo + 1;
    },

    resetPageNo: (state) => {
      state.pageNo = 0;
    },

    clearCart: (state) => {
      state.cart = null;
      state.cartCount = 0;
    },

    updateOrderDetails: ({ orderDetails }, { payload }) => {
      // console.log(addressId, "bfre update");
      console.log(payload);
      if (payload.cartId) orderDetails.cartId = payload.cartId;
      if (payload.addressId) orderDetails.addressId = payload.addressId;
      if (payload.couponCode) orderDetails.couponCode = payload.couponCode;
      // console.log(addressId);
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    resetOrder: (state, action) => {
      state.orderDetails = initialState.orderDetails;
    },
    applyDiscount: (state, { payload }) => {
      console.log(payload.type, "fromreducer");

      let { cartTotal } = state.cart;

      const check = cartTotal >= payload?.minmumPurchaseAmount;

      if (!check) {
        toast.error(`the required total cart value id  RS. ${payload?.minmumPurchaseAmount}`);
        return;
      }

      switch (payload.type) {
        case "isAmountOnly":
          // console.log(cartTotal - payload?.maxDiscountPrice);
          state.cart.discount = payload?.maxDiscountPrice;
          state.cart.discountedTotal =
            cartTotal >= payload?.minmumPurchaseAmount
              ? cartTotal - payload?.maxDiscountPrice
              : cartTotal;
          state.orderDetails.couponCode = payload?.couponCode;

          break;

        case "isPercentOnly":
          state.cart.discount = cartTotal * (parseInt(payload?.discountPercent) / 100);
          state.cart.discountedTotal =
            cartTotal >= payload?.minmumPurchaseAmount
              ? cartTotal - cartTotal * (parseInt(payload?.discountPercent) / 100)
              : cartTotal;
          state.orderDetails.couponCode = payload?.couponCode;

          break;

        case "isConditional":
          const discount = cartTotal * (parseInt(payload?.discountPercent) / 100);
          Math.round(discount);
          if (cartTotal >= payload?.minmumPurchaseAmount && discount < payload?.maxDiscountPrice) {
            state.cart.discountedTotal = cartTotal - discount;
            state.cart.discount = discount;
          }
          if (cartTotal >= payload?.minmumPurchaseAmount && discount > payload?.maxDiscountPrice) {
            state.cart.discountedTotal = cartTotal - payload?.maxDiscountPrice;
            state.cart.discount = payload?.maxDiscountPrice;
          }
          state.orderDetails.couponCode = payload?.couponCode;

          break;
        default:
          toast("this was not supposed to be happen");
      }
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
      })

      //updating CART

      .addCase(updateCart.pending, (state) => {
        state.updatingCart = true;
        state.error = null;
      })

      .addCase(updateCart.fulfilled, (state, action) => {
        toast("cart updated");

        console.log(action);

        const { prodId, quantity, cartCount, size } = action.payload;

        state.error = null;

        state.updatingCart = false;

        state.cartCount = cartCount;

        console.log(state.cart);

        if (state.cart?.cartItems) {
          const existInd = state.cart?.cartItems?.findIndex(
            (item) => item.prodId === prodId && item.size === size
          );

          const existItem = state.cart?.cartItems[existInd];

          if (existItem) {
            state.cart.cartTotal = state.cart.cartTotal + quantity * existItem.price;

            if (existItem.quantity === 1 && quantity === -1)
              state.cart?.cartItems?.splice(existInd, 1);
            // state.cart.cartItems = state.cart.cartItems.filter((item) => item.prodId !== prodId);
            else {
              const updateItem = {
                ...existItem,
                quantity: existItem.quantity + parseInt(quantity),
                itemTotal: existItem.itemTotal + quantity * existItem.price,
              };

              state.cart.cartItems[existInd] = updateItem;
            }
          }
        }
      })
      .addCase(updateCart.rejected, (state, { payload }) => {
        console.log(payload, "updateCart err");
        // state.cart = {};
        state.error = payload;
        state.updatingCart = false;
      })

      //for fetching cartCount

      .addCase(fetchCartCount.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCartCount.fulfilled, (state, { payload }) => {
        state.error = null;
        state.cartCount = payload.length > 0 ? payload[0]?.count : 0;
      })
      .addCase(fetchCartCount.rejected, (state, { payload }) => {
        state.cartCount = 0;
        state.error = payload;
      })

      //for fecthing cartItems

      .addCase(fetchCartItems.pending, (state) => {
        state.fetchingCart = true;
        state.error = null;
      })

      .addCase(fetchCartItems.fulfilled, (state, { payload }) => {
        console.log(payload, "fetch");
        state.fetchingCart = false;
        state.cart = payload.length > 0 ? payload[0] : null;
        state.orderDetails.cartId = payload[0]?._id;
        state.error = null;
      })
      .addCase(fetchCartItems.rejected, (state, { payload }) => {
        state.fetchingCart = false;
        state.error = payload;
        state.fetchingCart = [];
      });
  },
});

export const {
  resetProd,
  setPageNo,
  resetPageNo,
  clearCart,
  updateOrderDetails,
  setUserData,
  applyDiscount,
  sortProd,
} = shopSlice.actions;

export default shopSlice.reducer;
