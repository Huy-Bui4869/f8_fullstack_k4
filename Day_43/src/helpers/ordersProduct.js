import client from "../utils/client";
import { toast } from "react-toastify";

export const ordersProduct = async (body) => {
  try {
    console.log(body);

    // client.setToken(localStorage.getItem("apiKey"));
    const { response: res, data } = await client.post("/orders", body);

    console.log(res);
    console.log(data);
    if (res.status === 401) {
      throw new Error("Unauthorize");
    }

    return { res, data };
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
