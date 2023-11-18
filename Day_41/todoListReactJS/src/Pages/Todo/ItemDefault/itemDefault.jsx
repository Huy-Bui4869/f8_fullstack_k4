// import React, { Component } from "react";
import React from "react";
import "./itemDefault.scss";
import { Logger } from "sass";

export default function ItemDefault({ todo, onEdit, onRemove }) {
  //xóa.
  const handleDelete = (e) => {
    e.preventDefault();
    onRemove(todo._id);
  };

  //sửa.
  const handleEdit = (e) => {
    e.preventDefault();
    onEdit(false);
  };

  return (
    <div className="tools-listItem">
      <button className="editBtn" onClick={handleEdit}>
        Sửa
      </button>
      <button className="deleteBtn" onClick={handleDelete}>
        Xóa
      </button>
    </div>
  );
}
