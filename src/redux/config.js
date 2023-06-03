/** @format */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
 } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import storage from "redux-persist/lib/storage";
import { dataReducer } from "../redux/slice";

const persistConfig = {
  key: "1",
  storage,
};

const rootReducer = combineReducers({
  data: persistReducer(persistConfig, dataReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false

    }),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);










