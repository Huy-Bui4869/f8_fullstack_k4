import client from "../utils/clientUtils";

export const getProduct = async (param = {}) => {
  return await client.get(`/products${param}`);
};

export const getProductId = async (id = {}) => {
  return await client.get(`/products/${id}`);
};
