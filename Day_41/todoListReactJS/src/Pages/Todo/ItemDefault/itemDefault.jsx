// import React, { Component } from "react";
import React from "react";
import "./itemDefault.scss";
import { Logger } from "sass";

export default function itemDefault({ onRemove, onEdit }) {
  return (
    <div className="tools-listItem">
      <button
        className="editBtn"
        onClick={(e) => {
          e.preventDefault();
          onEdit(false);
        }}
      >
        Sửa
      </button>
      <button
        className="deleteBtn"
        onClick={(e) => {
          e.preventDefault();
          let el = e.target.parentElement.parentElement;
          console.log(el);
          console.log(el.key);
          // onRemove(key);
        }}
      >
        Xóa
      </button>
    </div>
  );
}
