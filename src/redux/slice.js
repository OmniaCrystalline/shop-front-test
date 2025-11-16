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
    applyPromotion(state) {
      // Знаходимо найдешевший товар, який ще не має акції
      const eligibleItems = state.basket.filter(item => !item.isPromoApplied);
      if (eligibleItems.length < 3) return;
      
      // Сортуємо за ціною (найдешевший перший)
      const sortedItems = [...eligibleItems].sort((a, b) => {
        const priceA = a.originalPrice || a.price;
        const priceB = b.originalPrice || b.price;
        return priceA - priceB;
      });
      
      const cheapestItem = sortedItems[0];
      const index = state.basket.findIndex((e) => e._id === cheapestItem._id);
      
      if (index !== -1) {
        // Зберігаємо оригінальну ціну
        if (!state.basket[index].originalPrice) {
          state.basket[index].originalPrice = state.basket[index].price;
        }
        // Встановлюємо ціну 0 та позначаємо, що акція застосована
        state.basket[index].price = 0;
        state.basket[index].isPromoApplied = true;
      }
    },
    removePromotion(state, action) {
      // Відміняємо акцію для товару
      const index = state.basket.findIndex((e) => e._id === action.payload);
      if (index !== -1 && state.basket[index].isPromoApplied && state.basket[index].originalPrice) {
        state.basket[index].price = state.basket[index].originalPrice;
        state.basket[index].isPromoApplied = false;
        delete state.basket[index].originalPrice;
      }
    },
    addUserData(state, action) {
      const data = { ...action.payload };
      data.date = new Date();
      // Відправляємо всі товари з кошика, незалежно від категорії
      data.order = [...state.basket];
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
  applyPromotion,
  removePromotion,
  addUserData,
  shopChoice,
} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
