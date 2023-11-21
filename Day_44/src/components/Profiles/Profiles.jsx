import React, { Fragment, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import emailjs from "@emailjs/browser";

import "./Profiles.scss";
import LogoutButton from "../Logout/Logout";
import { toast } from "react-toastify";
import { useDispatch } from "../../core/hook";

export default function Profiles() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const textareaRef = useRef();

  const sendForm = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    dispatch({ type: "ADD_LOADING" });

    const params = {
      to_name: user.name,
      message: textareaRef.current.value,
    };

    emailjs
      .send("service_zhkoqw8", "template_ktv7u2i", params, "IU2bN5Ch5oKPDnewU")
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          toast.success("Gửi email thành công. Cảm ơn bạn <3");
          dispatch({ type: "REMOVE_LOADING" });
          return;
        }

        toast.error("có lỗi xảy ra! Vui lòng thử lại");
        dispatch({ type: "REMOVE_LOADING" });
      });
  };

  return (
    <Fragment>
      {isAuthenticated && (
        <div className="container-profiles">
          <div className="container-profiles_inner">
            <div className="avatar-user">
              <img src={user.picture} alt="" />
            </div>
            <ul className="list-info">
              <li className="preamble">Xin Chào {user.name} !</li>
              <li className="lang">
                Vị trí : {(user.locale = "vi" ? "Tiếng Việt" : "Tiếng anh")}
              </li>
              <li className="email-user">
                Email: <a href="#!">{user.email}</a>
              </li>
            </ul>
            <form onSubmit={sendForm}>
              <div className="card card_email">
                <input
                  type="text"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  required
                  ref={emailRef}
                />
                <label htmlFor="email">Email của bạn *</label>
              </div>
              <div className="card card_content">
                <textarea
                  name="content"
                  id="content"
                  defaultValue="Tôi cần trợ giúp bài tập về nhà!"
                  required
                  ref={textareaRef}
                ></textarea>
                <label htmlFor="content">Tin nhắn *</label>
              </div>
              <button type="submit" className="btn_submit">
                Yêu cầu hỗ trợ!
              </button>
            </form>
          </div>
          <LogoutButton />
        </div>
      )}
    </Fragment>
  );
}
