import React from "react";
import { useState } from "react";
import { Logger } from "sass";
import ItemDefault from "../ItemDefault/itemDefault";
import ItemExtra from "../ItemExtra/ItemExtra";

import "./TodoItem.scss";
import client from "../../../config/client";

export function TodoItem({ todo }) {
  const [check, setCheck] = useState(true);

  //Sửa
  const handleEdit = (ee) => {
    setCheck(ee);
  };

  //xóa
  const handleRemove = async (id) => {
    console.log(`id cần xóa ${id}`);

    client.setToken(localStorage.getItem("apikey"));
    const { response, data } = await client.delete(`/todos/:${id}`);

    console.log(response);
    console.log(data);
  };

  //Đánh dấu hoàn thành công việc
  const handleCompleted = (value, booland) => {
    const el = value.children[0];
    el.style.textDecoration = booland ? "line-through" : "none";
  };

  //Update
  const handleUpdate = (e, value, n) => {
    const el = e.children[0];
    console.log(el);
    console.log(value);
    console.log(n);
  };

  return (
    <li className="listItem">
      <input type="text" defaultValue={todo} />
      {check ? (
        <ItemDefault onRemove={handleRemove} onEdit={handleEdit} />
      ) : (
        <ItemExtra
          onExit={handleEdit}
          onRemove={handleRemove}
          onCompleted={handleCompleted}
          onUpdate={handleUpdate}
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
