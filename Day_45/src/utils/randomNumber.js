export const randomNumber = function (max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Tính tổng số lượt chơi.
export const numberTurn = (number_range) => {
  return Math.ceil(Math.log2(number_range));
};
