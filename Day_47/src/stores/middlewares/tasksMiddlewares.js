import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTask } from "../../services/tasksServices";

export const getTasks = createAsyncThunk("getTasks", async () => {
  const { data } = await getTask();
  return data;
});
