import client from "../utils/clientUtils";
import { endpoint } from "../utils/configUtils";

export const getApiKey = async (query) => {
  return await client.get(`${endpoint.apiKey}?email=${query}`);
};
