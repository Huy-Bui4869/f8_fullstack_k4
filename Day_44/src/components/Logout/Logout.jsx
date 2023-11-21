import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./Logout.scss";
import { useDispatch } from "../../core/hook";

export default function LogoutButton() {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  return (
    <button
      className="btn_logout"
      onClick={() => {
        dispatch({ type: "ADD_LOADING" });
        logout({ logoutParams: { returnTo: window.location.origin } });
      }}
    >
      ĐĂNG SUẤT
    </button>
  );
}
