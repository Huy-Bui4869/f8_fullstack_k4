import React, { useState } from "react";

import { toast } from "react-toastify";
import { Logger } from "sass";
import ItemDefault from "../itemDefault/itemDefault";
import ItemExtra from "../ItemExtra/ItemExtra";
import "./TodoItem.scss";

export function TodoItem({ todo, onRemove, onUpdate }) {
  const [check, setCheck] = useState(true);
  const [value, setValue] = useState([]);
  const [line, setLine] = useState("");

  //Sửa
  const handleEdit = (ee) => {
    setCheck(ee);
  };

  //Đánh dấu hoàn thành công việc
  const handleCompleted = (completed) => {
    setLine(completed);
  };

  //Lấy id và value sau khi update
  const handleGetValueId = (_id) => {
    onUpdate(_id, value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <li className="listItem" key={todo._id}>
      <input
        type="text"
        defaultValue={todo.todo}
        data-check={todo.isCompleted}
        onChange={handleChange}
        style={
          line ? { textDecoration: "line-through" } : { textDecoration: "none" }
        }
      />
      {check ? (
        <ItemDefault todo={todo} onRemove={onRemove} onEdit={handleEdit} />
      ) : (
        <ItemExtra
          todo={todo}
          onRemove={onRemove}
          onExit={handleEdit}
          onUpdate={handleGetValueId}
          onCompleted={handleCompleted}
        />
      )}
    </li>
  );
}

export function NodeItem() {
  return (
    <li className="listItem">
      <p>Không có tudo</p>
    </li>
  );
}
