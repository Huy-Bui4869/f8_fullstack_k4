import { RANGE_NUMBER } from "../config/config";
import { numberTurn, randomNumber } from "../utils/randomNumber";
const local = localStorage.getItem("NUMBER_RANGE");

const inittialState = {
  numberRanger: local || RANGE_NUMBER,
  maxTurn: numberTurn(local),
  random: randomNumber(local),
  finalTurn: numberTurn(local),
};

export const resetResult = (state = inittialState, action) => {
  switch (action.type) {
    case "RESET_DATA": {
      const pay = +action.payload || localStorage.getItem("NUMBER_RANGE");
      console.log(pay);
      return {
        ...state,
        numberRange: pay,
        maxTurn: numberTurn(pay),
        random: randomNumber(0, pay),
        finalTurn: numberTurn(pay),
      };
    }

    case "TURN_NOT": {
      return { ...state, finalTurn: 0 };
    }

    case "TURN_UPDATE": {
      const turn = state.finalTurn > 1 ? state.finalTurn - 1 : 0;
      return { ...state, finalTurn: turn };
    }

    default: {
      return state;
    }
  }
};
