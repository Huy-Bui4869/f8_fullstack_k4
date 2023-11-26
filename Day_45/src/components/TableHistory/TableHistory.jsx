import { useRef, useState } from "react";

import "./TableHistory.scss";

import CardHistory from "./CardHistory";
import ModelDel from "../ModelDel/ModelDel";
import { useDispatch } from "react-redux";

function TableHistory() {
  const cardRef = useRef();
  const [isDrag, setIsDrag] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = (type) => {
    console.log(type);
    if (type === "NO") {
      setIsDrag(false);
    }

    if (type === "REMOVE") {
      localStorage.removeItem("history");
      dispatch({
        type: "RESET_DATA",
      });
      setIsDrag(false);
    }
  };

  return (
    <>
      <div className={"table-history"}>
        {
          <button className="btnRemove" onClick={(e) => setIsDrag(true)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        }
        <CardHistory ref={cardRef} />
      </div>
      {isDrag && <ModelDel onClick={handleRemove} />}
    </>
  );
}

export default TableHistory;
