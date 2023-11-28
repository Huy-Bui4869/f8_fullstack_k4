import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct, getProductId } from "../../services/productServices";

export const getProducts = createAsyncThunk("getProducts", async (param) => {
  const { data } = await getProduct(param);
  console.log(data);
  return data;
});

export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (id) => {
    const { data } = await getProductId(id);
    return data;
  }
);
