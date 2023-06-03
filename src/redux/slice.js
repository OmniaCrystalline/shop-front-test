/** @format */
import { createSlice } from "@reduxjs/toolkit";

import {
  getAllProducts,
  getOneTypeProduct,
  sendOrder,
} from "../redux/operations";
import {
  handleResolveProducts,
  handlePending,
  handleRejected,
  handleResolveOrder,
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
};

export const dataSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCard(state, action) {
      if (state.basket.filter((e) => e._id === action.payload._id).length !== 0)
        return;
      const data = { ...action.payload };
      data.quantity = 1;
      state.basket.push(data);
    },
    removeFromCard(state, action) {
      //_id
      state.basket = state.basket.filter((e) => e._id !== action.payload);
    },
    changeQuantity(state, action) {
      console.log("changeQuantity.payload", action.payload);
      //[_id, quantity]
      const index = state.basket.findIndex((e) => e._id === action.payload[0]);
      console.log("index", index);
      state.basket[index].quantity = Number(action.payload[1]);
    },
    addUserData(state, action) {
      const data = {...action.payload}
      data.date = new Date();
      data.order = state.basket;
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
      .addCase(sendOrder.fulfilled, handleResolveOrder);
  },
});

export const {
  resolveProducts,
  addToCard,
  removeFromCard,
  changeQuantity,
  addUserData,
} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
