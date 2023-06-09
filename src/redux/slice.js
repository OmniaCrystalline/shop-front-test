/** @format */
import { createSlice } from "@reduxjs/toolkit";

import {
  getAllProducts,
  getOneTypeProduct,
  sendOrder,
  getOrdersOfUser,
} from "../redux/operations";
import {
  handleResolveProducts,
  handlePending,
  handleRejected,
  handleResolveOrder,
  handleResolveHistory,
} from "../redux/resolvers";

const initialState = {
  basket: [],
  user: {
    name: "",
    phone: "",
    email: "",
    adress: "",
    date: null,
    order: [],
  },
  isLoading: false,
  products: [],
  history: [],
  current: "all",
};

export const dataSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    shopChoice(state, action) {
      state.current = action.payload;
    },
    addToCard(state, action) {
      if (state.basket.filter((e) => e._id === action.payload._id).length !== 0)
        return;
      const data = { ...action.payload };
      data.quantity = 1;
      state.basket.push(data);
    },
    removeFromCard(state, action) {
      state.basket = state.basket.filter((e) => e._id !== action.payload);
    },
    changeQuantity(state, action) {
      const index = state.basket.findIndex((e) => e._id === action.payload[0]);
      state.basket[index].quantity = Number(action.payload[1]);
    },
    addUserData(state, action) {
      const data = { ...action.payload };
      data.date = new Date();
      data.order = state.basket.filter(e => e.seller === state.current)
      console.log('data.order', data.order)
      state.user = data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, handleResolveProducts)
      .addCase(getAllProducts.pending, handlePending)
      .addCase(getAllProducts.rejected, handleRejected)
      .addCase(getOneTypeProduct.pending, handlePending)
      .addCase(getOneTypeProduct.rejected, handleRejected)
      .addCase(getOneTypeProduct.fulfilled, handleResolveProducts)
      .addCase(sendOrder.pending, handlePending)
      .addCase(sendOrder.rejected, handleRejected)
      .addCase(sendOrder.fulfilled, handleResolveOrder)
      .addCase(getOrdersOfUser.pending, handlePending)
      .addCase(getOrdersOfUser.rejected, handleRejected)
      .addCase(getOrdersOfUser.fulfilled, handleResolveHistory);
  },
});

export const {
  resolveProducts,
  addToCard,
  removeFromCard,
  changeQuantity,
  addUserData,
  shopChoice,
} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
