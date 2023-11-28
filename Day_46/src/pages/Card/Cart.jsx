import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Cart.scss";

import { cartSlice } from "../../stores/slices/cartSlice";
import NoProducts from "../Product/NoProducts";
const { increment, decrement, removeId, checkOut } = cartSlice.actions;

function Cart() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();

  const handleClick = (type, _id = null) => {
    switch (type) {
      case "decrement": {
        dispatch(decrement(_id));
        break;
      }
      case "increment": {
        dispatch(increment(_id));
        break;
      }
      case "remove": {
        dispatch(removeId(_id));
        break;
      }
      case "removeAll": {
        alert("Bạn muốn xóa hết tất cả sản phẩm");
        dispatch(checkOut());
        break;
      }
    }
  };

  return (
    <div className="wrapper">
      <h1 className="title_page">Shopping Cart</h1>
      {!cart.length ? (
        <NoProducts />
      ) : (
        <div>
          <div className="box-cart">
            {cart.map(
              ({ _id, name, price, _amount, brand, quantity, image }) => {
                return (
                  <div key={_id} className="box-cart_inner">
                    <div
                      className="box-cart_inner_img"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <div className="box-cart_inner_content">
                      <div className="box-cart_inner_content_top">
                        <div>
                          <h2 className="heading-content">{name}</h2>
                          <ul>
                            <li>
                              <span>{brand}</span>
                            </li>
                            <li>
                              <span>${price}</span>
                            </li>
                            <li>
                              <span>Còn lại: {quantity}</span>
                            </li>
                          </ul>
                        </div>
                        <button
                          className="btnRemove"
                          onClick={() => handleClick("remove", _id)}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>

                      <div className="box-cart_inner_content_bottom">
                        <span>${price * _amount}</span>
                        <div className="amount">
                          <button
                            disabled={_amount === 1 ? true : false}
                            style={{
                              borderColor: `${
                                _amount === 1 ? "gray" : "#602192"
                              }`,
                            }}
                            onClick={() => handleClick("decrement", _id)}
                          >
                            -
                          </button>
                          <span>{_amount}</span>
                          <button onClick={() => handleClick("increment", _id)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <hr />
          <div className="footer">
            <div className="btns">
              <form className="box_discountCode">
                <label htmlFor="discountCode">Have A Promo Code?</label>
                <input type="text" id="discountCode" placeholder="Code..." />
                <button className="btnSubmit">
                  <i className="fa-solid fa-check-double"></i>
                </button>
              </form>
              <button className="btnGoHome" onClick={() => navigate("/")}>
                Go home
              </button>
              <button
                className="btnCheckOut"
                onClick={() => handleClick("removeAll")}
              >
                CheckOut
              </button>
            </div>
            <div className="pay">
              <div className="pay_inner">
                <span className="pay_inner_text">Total Price</span>
                <span className="pay_inner_total">
                  $
                  {cart.reduce((pre, { price, _amount }) => {
                    return pre + _amount * price;
                  }, 0)}
                </span>
              </div>
              <button className="btnPay">Thanh toán</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
