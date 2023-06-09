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

export const getOrdersOfUser = createAsyncThunk(
  "orders/get",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/ordersOfUser", data);
      console.log("res.data", res.data);
      return res.data.info;
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
    try {
      const data = { ...order };

      if (order._id) {
        delete data._id;
      }
      const res = await axios.post("/", data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addAll = createAsyncThunk("all/post", async (data, thunkAPI) => {
  try {
    const res = await axios.post("/addmenu", data);
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
