export const initialState = {
  products: [],
  orderList: [],
  checkLocal: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_LIST_PRODUCT": {
      return { ...state, products: action.payload };
    }

    case "ADD_CART": {
      const index = state.orderList.findIndex(
        ({ productId }) => productId === action.payload.productId
      );
      if (index === -1) {
        state.orderList.push(action.payload);
      } else {
        state.orderList[index].quantity++;
        state.orderList[index].surplus--;
      }
      localStorage.setItem("cart", JSON.stringify(state.orderList));
      return {
        ...state,
        orderList: [...state.orderList],
      };
    }

    case "CLEAR_CART": {
      localStorage.removeItem("cart");
      return { ...state, orderList: [] };
    }

    default:
      return state;
  }
};
//các key xử lý
