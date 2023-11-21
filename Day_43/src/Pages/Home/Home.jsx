import React from "react";
import "./Home.scss";
import Product from "./Product/Product";

export default function Home() {
  return (
    <div className="shop">
      {/* {console.log("Render trang chủ")} */}
      <h2 className="title-page-shop">Welcome to shop</h2>
      <Product />
    </div>
  );
}
