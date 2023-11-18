import React, { useEffect, useState, Fragment } from "react";

import "./Product.scss";
import { getListProduct } from "../../helpers/getListProducts";
import { useDispatch, useStateCustom } from "../../core/hook";
import Loading from "../../components/Loading/Loading";
import Cart from "../Cart/Cart";
import { toast } from "react-toastify";

export default function Product() {
  const [loading, setLoading] = useState(true);

  const products = useStateCustom((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    getListProduct({ limit: 8 }).then((response) => {
      const { res, listProduct } = response;
      console.log(listProduct);
      dispatch({
        type: "GET_LIST_PRODUCT",
        payload: listProduct,
      });
      setLoading(false);
    });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch({
      type: "ADD_CART",
      payload: {
        productId: e.target.id,
        quantity: 1,
        name: e.target.name,
        price: e.target.getAttribute("data-price"),
        surplus: e.target.getAttribute("data-quantity"),
      },
    });
    setLoading(false);
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  return (
    <Fragment>
      <div className="container_product">
        {products.map(({ _id, name, image, price, quantity }) => {
          return (
            <div className="card-product" key={_id}>
              <div className="card-top">
                <img src={image} alt="" />
              </div>
              <div className="card-bottom">
                <h3 className="title-card-product">{name}</h3>
                <div className="card-bottom_inner">
                  <span className="price">${price}</span>
                  <button
                    className="addBtn"
                    onClick={handleClick}
                    id={_id}
                    name={name}
                    data-price={price}
                    data-quantity={quantity}
                  >
                    Add to cart!
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Cart />
      {loading && <Loading />}
    </Fragment>
  );
}
