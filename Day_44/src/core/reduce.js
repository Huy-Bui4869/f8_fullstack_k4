export const initialState = {
  loading: false,
};

console.log(initialState.orderList);

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_LOADING": {
      return { ...state, loading: true };
    }

    case "REMOVE_LOADING": {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
};
//các key xử lý
