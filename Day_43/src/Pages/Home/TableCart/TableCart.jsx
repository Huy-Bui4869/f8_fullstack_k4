import React, { Fragment } from "react";
import { toast } from "react-toastify";

import "./TableCart.scss";
import { useDispatch } from "../../../core/hook";
import { ordersProduct } from "../../../helpers/ordersProduct";

export default function TableCart({ orderList }) {
  const dispatch = useDispatch();

  const handlePay = (e) => {
    e.preventDefault();
    console.log("thanh toán");
    const orders = orderList.map((item) => {
      delete item.name;
      delete item.price;
      delete item.surplus;
      return item;
    });

    ordersProduct(orders).then((response) => {
      const { res, data } = response;
      if (res.ok) {
        dispatch({
          type: "CLEAR_CART",
        });
        toast.info("Thanh toán thành công");
      }
    });
  };

  return (
    <Fragment>
      <table id="tableCart" width="100%" border="1">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Còn lại</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map(({ productId, quantity, name, price, surplus }) => {
            return (
              <tr key={productId} className="descSp">
                <td>{name}</td>
                <td>{quantity}</td>
                <td>{surplus}</td>
                <td>{price * quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="btnPay" onClick={handlePay}>
        Thanh toán
      </button>
    </Fragment>
  );
}
