import { Outlet } from "react-router-dom";

import "./DefaultLayout.scss";

import Header from "./Header";

function DefaultLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default DefaultLayout;
