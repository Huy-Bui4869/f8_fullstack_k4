import { useId } from "react";
import { useSelector } from "react-redux";

function Pagination({ onPages }) {
  const { id } = useId;
  const totalPages = useSelector((state) => state.product.totalPage);
  const ranges = [...Array(totalPages).keys()]; //Tạo 1array từ 0 đến totalPages
  const handleClick = (value) => {
    onPages(value);
  };

  return (
    <div className="row">
      <ul className="list-pages">
        {/* {ranges.map((range, i) => {
          return (
            <li key={i}>
              <span
                style={{ color: "#fff" }}
                onClick={() => handleClick(range)}
              >
                {range}
              </span>
            </li>
          );
        })} */}
      </ul>
    </div>
  );
}

export default Pagination;
