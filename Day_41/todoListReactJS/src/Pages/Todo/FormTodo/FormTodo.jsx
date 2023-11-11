import React from "react";
import "./FormTodo.scss";
import { toast } from "react-toastify";

export default function FormTodo({ onSubmits }) {
  let text;
  return (
    <div className="innerTop">
      <h2>Welcome to Todo App!</h2>
      <form
        className="todoForm"
        onSubmit={(e) => {
          e.preventDefault();
          const value = e.target.children[0].value;

          if (value.length <= 1) {
            toast.warning("cần nhập nhiều hơn một ký tự");
            return;
          }
          onSubmits(value);
          setTimeout(() => {
            e.target.children[0].value = "";
          }, 500);
        }}
      >
        <input type="text" placeholder="Thêm một việc làm mới" />
        <button className="addTodo" type="submit">
          Thêm mới
        </button>
      </form>
    </div>
  );
}
