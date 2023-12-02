import { useRef } from "react";

import "./AuthLayout.scss";

import { getApiKey } from "../../services/apikeyServices.js";
import { validateEmail } from "~/utils/regex.js";
import { toast } from "react-toastify";

function AuthLayout({ onSub }) {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;

    if (!value.length) {
      toast.warning("Please enter email");
      return;
    }

    if (validateEmail(value) === false) {
      toast.warning("Please enter the correct email format");
      return;
    }

    getApiKey(value).then((res) => {
      try {
        const { data } = res;
        console.log(data);

        if (data.code === 400) {
          throw new Error("Email không tồn tại trong dữ liệu");
        }
        if (data.code === 401) {
          throw new Error("Unauthorized");
        }

        localStorage.setItem("email", value);
        localStorage.setItem("apiKey", data.data.apiKey);
        onSub(true);
      } catch (e) {
        toast.error(e.message);
        if (e.message === "Unauthorized") {
          localStorage.removeItem("email");
          localStorage.removeItem("apiKey");
          setTimeout(() => {
            window.location.onLoad();
          }, 1000);

          return () => {
            clearTimeout();
          };
        }
      }
    });
  };

  return (
    <div className="box-auth">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter the email</label>
        <input
          type="text"
          id="email"
          placeholder="Nhập email của bạn..."
          ref={inputRef}
          defaultValue={"huybui2451@gmail.com"}
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AuthLayout;
