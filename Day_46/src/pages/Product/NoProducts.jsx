import { useNavigate } from "react-router-dom";

function NoProducts() {
  const navigate = useNavigate();

  return (
    <div className="noProduct">
      <div className="noProduct_inner">
        <p>There is no product in your cart!</p>
        <button
          className="btnGoHome"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NoProducts;
