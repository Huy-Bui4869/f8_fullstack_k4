//---
const inittialState = {
  rangeNumber: 0,
};

export const maxNumberReducer = (state = inittialState, action) => {
  switch (action.type) {
    case "UPDATE_NUMBERRANGE": {
      return { ...state, rangeNumber: action.payload };
    }

    default: {
      return state;
    }
  }
};
