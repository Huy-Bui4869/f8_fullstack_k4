import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./Login.scss";
import { useDispatch } from "../../core/hook";

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  return (
    <Fragment>
      {!isAuthenticated && (
        <div className="container_login">
          <h1 className="title_login">Cảm ơn bạn đã sử dụng dịch vụ của F8</h1>
          <p className="des_login">
            Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi
            tại đây!
          </p>
          <button
            className="btn_login"
            onClick={() => {
              dispatch({ type: "ADD_LOADING" });
              loginWithRedirect();
            }}
          >
            ĐĂNG NHẬP || ĐĂNG KÝ
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
