import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./slice/tasksSlice";

export const store = configureStore({
  reducer: {
    task: tasksSlice.reducer,
  },
});
