import { useRef } from "react";
import { useDispatch } from "react-redux";
import "./ModelDel.scss";

function ModelConfirmDel({ onClick }) {
  const dispatch = useDispatch();
  return (
    <div className="overlay">
      <div className="boxModel">
        <h3>Xoá tất cả lịch sử chơi?</h3>
        <p>
          Bạn chắc chắn chứ? Bạn sẽ không thể giữ lại lịch sử chơi trong quá khứ
          sau khi bấm xoá.
        </p>
        <div className="card-btn">
          <button className="confirm ex" onClick={() => onClick("NO")}>
            Giữ lại
          </button>
          <button
            className="confirm del"
            onClick={(e) => {
              onClick("REMOVE");
            }}
          >
            Xóa luôn
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModelConfirmDel;
