import client from "../utils/clientUtils";
import { endpoint } from "../utils/configUtils";

export const getTask = async () => {
  client.setToken(localStorage.getItem("apiKey"));
  return await client.get(`${endpoint.tasks}`);
};
