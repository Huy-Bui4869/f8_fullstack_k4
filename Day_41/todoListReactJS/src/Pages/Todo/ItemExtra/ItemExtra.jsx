import React, { useState } from "react";
import "./ItemExtra.scss";
import { Logger } from "sass";

export default function ItemExtra({
  todo,
  onExit,
  onRemove,
  onUpdate,
  onCompleted,
}) {
  const [check, setCheck] = useState(false);
  //thoát.
  const handleExit = (e) => {
    e.preventDefault();
    onExit(true);
  };

  //xóa.
  const handleDelete = (e) => {
    console.log(`Laay id can xóa ${todo._id}`);
    e.preventDefault();
    onRemove(todo._id);
    setTimeout(() => {
      onExit(true);
    }, 500);
  };

  //update sau khi sửa.
  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(todo._id, check);
    onExit(true);
  };

  const handleCompleted = (e) => {
    e.preventDefault();
    setCheck(!check);
    onCompleted(!check);
  };

  return (
    <div className="tools-listItem_extra">
      <div className="isCheck">
        <label>
          <input
            type="checkbox"
            onClick={handleCompleted}
            // defaultChecked={check}
          />
          {check ? "Completed" : "Not Completed"}
        </label>
      </div>
      <div className="btnTools">
        <button className="exitBtn" onClick={handleExit}>
          Thoát
        </button>
        <button className="editBtn" onClick={handleUpdate}>
          Update
        </button>
        <button className="deleteBtn" onClick={handleDelete}>
          Xóa
        </button>
      </div>
    </div>
  );
}
