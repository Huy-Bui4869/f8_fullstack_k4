import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./DefaultLayout.scss";

function Header() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.listCart);

  return (
    <div className="header">
      <div className="logo_page" onClick={() => navigate("/")}>
        <img
          src="https://png.pngtree.com/png-vector/20210514/ourlarge/pngtree-red-wolf-logo-template-for-esport-team-png-image_3293973.jpg"
          alt=""
        />
      </div>

      <div className="cart_container">
        <span className="amount">
          {cart.reduce((a, { _amount }) => {
            return a + _amount;
          }, 0)}
        </span>
        <button className="btnCart" onClick={() => navigate("/cart")}>
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
