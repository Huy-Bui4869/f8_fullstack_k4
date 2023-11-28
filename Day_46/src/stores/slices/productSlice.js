import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductDetails,
} from "../middlewares/productMiddlewares";

const initialState = {
  listProduct: [],
  status: "idle",
  detail: {},
  totalPage: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.totalPage = action.payload.data.totalPage;
      state.listProduct = action.payload.data.listProduct;
      state.status = "success";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = "error";
    });

    builder.addCase(getProductDetails.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.status = "success";
    });
    builder.addCase(getProductDetails.rejected, (state) => {
      state.status = "error";
    });
  },
});
