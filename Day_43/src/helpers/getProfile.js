import client from "../utils/client";
import { toast } from "react-toastify";

export const getProfile = async () => {
  try {
    client.setToken(localStorage.getItem("apiKey"));
    const { response: res, data } = await client.get("/users/profile");

    if (res.status === 401) {
      throw new Error("Unauthorize");
    }

    const nameUser = data.data.emailId.name;

    return { data, nameUser };
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
