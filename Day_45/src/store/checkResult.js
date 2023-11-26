const inittialState = {
  text: "Chào mừng bạn đến với trò chơi đến số!",
  data: [],
  history: JSON.parse(localStorage.getItem("history")) || [],
};

export const checkResult = (state = inittialState, action) => {
  switch (action.type) {
    case "RENDER_TEXT": {
      return { ...state, text: action.payload };
    }
    case "AĐD_DATA": {
      state.data.push(action.payload);
      return { ...state, data: [...state.data] };
    }

    case "ADD_HISTORY_LOCALSTORAGE": {
      state.history.unshift(action.payload);
      localStorage.setItem("history", JSON.stringify(state.history));

      return { ...state, history: [...state.history] };
    }

    // case "UPDATE_RELOADER": {
    //   return { ...state, history: action.payload };
    // }

    default: {
      return state;
    }
  }
};
