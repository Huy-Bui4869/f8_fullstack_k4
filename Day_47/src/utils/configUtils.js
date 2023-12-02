const SERVER_API = "https://api-exercise-trello.vercel.app/api/v1";

export default SERVER_API;

export const endpoint = {
  apiKey: "/api-key",
  tasks: "/tasks",
};

export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return [];

  const clonedArray = [...originalArray];
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });

  return orderedArray;
};
