import { toast } from "react-toastify";
import client from "../utils/client";

export const getApiKey = async (email) => {
  try {
    const { response: res, data } = await client.get(`/api-key?email=${email}`);

    console.log(res);
    console.log(data);
    if (res.status === 401) {
      throw new Error("Unauthorize");
    }

    if (res.status === 400) {
      throw new Error("Email không tồn tại trong dữ liệu");
    }

    const apiKey = data.data.apiKey;

    return { res, data, apiKey };
  } catch (e) {
    if (e.message === "Unauthorize") {
      localStorage.clear();
      toast.error("có lỗi xảy ra! Vui lòng load lại trang");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    if (e.message === "Email không tồn tại trong dữ liệu") {
      localStorage.clear();
      toast.error(e.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
};
