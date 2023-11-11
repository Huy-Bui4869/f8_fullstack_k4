import React from "react";
import "./itemExtra.scss";

export default function ItemExtra({
  key,
  onExit,
  onRemove,
  onCompleted,
  onUpdate,
}) {
  return (
    <div className="tools-listItem_extra">
      <div className="isCheck">
        <label>
          <input
            type="checkbox"
            onClick={(e) => {
              const elCheck = e.target.checked ? true : false;
              const el =
                e.target.parentElement.parentElement.parentElement
                  .parentElement;
              onCompleted(el, elCheck);
            }}
          />{" "}
          Not Completed
        </label>
      </div>
      <div className="btnTools">
        <button
          className="exitBtn"
          onClick={(e) => {
            e.preventDefault();
            onExit(true);
          }}
        >
          Thoát
        </button>
        <button
          className="editBtn"
          onClick={(e) => {
            e.preventDefault();
            const el = e.target.parentElement.parentElement.parentElement;
            onUpdate(el, el.children[0].value, true);
          }}
        >
          Update
        </button>
        <button
          className="deleteBtn"
          onClick={(e) => {
            e.preventDefault();
            onRemove(key);
          }}
        >
          Xóa
        </button>
      </div>
    </div>
  );
}
