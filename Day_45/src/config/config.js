export const RANGE_NUMBER = localStorage.getItem("NUMBER_RANGE") || 100;

const MAX_TURN = Math.ceil(Math.log2(RANGE_NUMBER));
export default MAX_TURN;
