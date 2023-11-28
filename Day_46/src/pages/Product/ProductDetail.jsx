import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getProductDetails } from "../../stores/middlewares/productMiddlewares";
import { cartSlice } from "../../stores/slices/cartSlice";
import Loading from "../../components/Loading/Loading";

import "./Product.scss";
const { add } = cartSlice.actions;

function ProductDetail() {
  const { id } = useParams();
  // const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.product.status);
  const detail = useSelector((state) => state.product.detail);

  const handleAddToCart = () => {
    dispatch(add(detail.data));
  };

  if (status === "error") {
    toast.error("Đã có lỗi xảy ra! Vui lòng loader lại trang.");
  }

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  return (
    <div className="wrapper wapper_detail">
      <h1 className="title_page">Chi tiết sản phẩm</h1>
      {status !== "idle" &&
        (status === "pending" ? (
          <Loading />
        ) : (
          detail.data !== undefined && (
            <div className="product_details">
              <img src={detail.data.image} className="image_details" />
              <div className="content_details">
                <span>{detail.data.brand}</span>
                <h2>{detail.data.name}</h2>
                <p>"{detail.data.description}"</p>
                <span>category: {detail.data.category}</span>
                <div className="content_details_footer">
                  <button className="btnGoHome" onClick={() => navigate("/")}>
                    Go home
                  </button>
                  <div className="footer_inner">
                    <p>{detail.data.price}</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
    </div>
  );
}

export default ProductDetail;
