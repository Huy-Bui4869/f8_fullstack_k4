import React, { Fragment } from "react";

import "./cart.scss";
import TableCart from "../TableCart/TableCart";

export default function Cart() {
  const orderList = JSON.parse(localStorage.getItem("cart"));
  // console.log(orderList);
  return (
    <Fragment>
      {orderList === null ? (
        <div className="none">Không có sản phẩm</div>
      ) : (
        <TableCart orderList={orderList} />
      )}
    </Fragment>
  );
}
