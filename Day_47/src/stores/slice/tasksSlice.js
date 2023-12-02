import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "../middlewares/tasksMiddlewares";

const initialState = {
  columns: [],
  listTasks: [],
  status: "idle",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.columns = action.payload.data.columns;
      state.listTasks = action.payload.data.tasks;
      state.status = "success";
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.status = "error";
    });
  },
});
