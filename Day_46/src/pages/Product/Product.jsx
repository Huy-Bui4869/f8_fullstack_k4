import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./Product.scss";

import { getProducts } from "../../stores/middlewares/productMiddlewares";
import { cartSlice } from "../../stores/slices/cartSlice";
import Pagination from "./Pagination";
import Loading from "../../components/Loading/Loading";

const { add } = cartSlice.actions;

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.product.listProduct);
  const status = useSelector((state) => state.product.status);

  //Xem chi tiết sp
  const handleProductDetail = (_id) => {
    navigate(`/${_id}`, { state: { id: _id } });
  };

  //Thêm sp vào giỏ hàng
  const handleAddToCart = (id) => {
    const data = listProduct.find(({ _id }) => _id === id);
    dispatch(add(data));
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  if (status === "error") {
    toast.error("Đã có lỗi xảy ra! Vui lòng loader lại trang.");
  }

  const handlePages = (query = {}) => {
    console.log(query);
    let queryString = new URLSearchParams(query).toString();

    queryString = queryString ? "?" + queryString : "";
    dispatch(getProducts(queryString));
  };

  useEffect(() => {
    dispatch(getProducts("?limit=15&page=2"));

    // toast.info("Chào mừng bạn");
  }, []);

  return (
    <div className="wrapper">
      <h1 className="title_page">Products</h1>
      {status !== "idle" && status === "pending" ? (
        <Loading />
      ) : (
        <>
          <div className="card-product">
            {listProduct.map(({ _id, name, image, price }) => (
              <div key={_id} className="card-product_inner">
                <div
                  className="card-product_inner_top"
                  onClick={() => handleProductDetail(_id)}
                >
                  <div className="image">
                    <img src={image} alt="" />
                  </div>
                  <h2 className="title-image">{name}</h2>
                </div>
                <div className="card-product_inner_bottom">
                  <span className="price">${price}</span>
                  <button
                    className="btnAddToCart"
                    onClick={(e) => handleAddToCart(_id)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination onPages={handlePages} />
        </>
      )}
    </div>
  );
}

export default Product;
