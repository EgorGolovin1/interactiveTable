import { configureStore } from "@reduxjs/toolkit";
import { contentApi } from "../feature/api/services/content";
import table from "./slice";

export const store = configureStore({
  reducer: {
    [contentApi.reducerPath]: contentApi.reducer,
    table: table,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(contentApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
