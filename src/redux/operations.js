/** @format */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://foodshop-ctkp.onrender.com";

export const getAllProducts = createAsyncThunk(
  "all/get",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/allgoods");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOneTypeProduct = createAsyncThunk(
  "onetype/get",
  async (shop, thunkAPI) => {
    try {
      const res = await axios.get(`/onetype/${shop}`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendOrder = createAsyncThunk(
  "order/post",
  async (order, thunkAPI) => {
    console.log('order', order)
    try {
      const res = await axios.post('/', order);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
