import client from "../utils/client";
import { toast } from "react-toastify";

export const getListProduct = async (query = {}) => {
  try {
    let queryString = new URLSearchParams(query).toString();
    queryString = queryString ? "?" + queryString : "";
    const { response: res, data } = await client.get(`/products${queryString}`);
    console.log(data);

    if (!res.status === 401) {
      throw new Error("Unauthorize");
    }

    const listProduct = data.data.listProduct;
    return { res, listProduct };
  } catch (e) {
    if (e.message === "Unauthorize") {
      localStorage.removeItem("apiKey");
      localStorage.removeItem("email");
      toast.error("có lỗi xảy ra! Vui lòng load lại trang");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }
};
