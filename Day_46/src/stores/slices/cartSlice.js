import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCart: JSON.parse(localStorage.getItem("value")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const payload = JSON.parse(JSON.stringify(action.payload));
      const index = state.listCart.findIndex(({ _id }) => _id === payload._id);

      if (index === -1) {
        payload["_amount"] = 1;
        state.listCart = [...state.listCart, payload];
      } else {
        state.listCart[index]["_amount"] += 1;
        state.listCart = [...state.listCart];
      }

      localStorage.setItem("value", JSON.stringify(state.listCart));
    },

    decrement: (state, action) => {
      const index = state.listCart.findIndex(
        ({ _id }) => _id === action.payload
      );
      state.listCart[index]["_amount"] -= 1;
      state.listCart = [...state.listCart];

      localStorage.setItem("value", JSON.stringify(state.listCart));
    },

    increment: (state, action) => {
      const index = state.listCart.findIndex(
        ({ _id }) => _id === action.payload
      );
      state.listCart[index]["_amount"] += 1;
      state.listCart = [...state.listCart];

      localStorage.setItem("value", JSON.stringify(state.listCart));
    },

    removeId: (state, action) => {
      const newListCart = state.listCart.filter(
        ({ _id }) => _id !== action.payload
      );

      state.listCart = newListCart;
      localStorage.setItem("value", JSON.stringify(state.listCart));
    },

    checkOut: (state) => {
      state.listCart = [];
      localStorage.removeItem("value");
    },
  },
});
