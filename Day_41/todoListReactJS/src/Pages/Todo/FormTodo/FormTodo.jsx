import React, { useState } from "react";
import "./FormTodo.scss";
import { toast } from "react-toastify";

export default function FormTodo({ onSubmits, onSearch }) {
  const [name, setName] = useState("");
  const [check, setCheck] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheck(false);

    if (!name.trim().length) {
      toast.warning("vui lòng nhập tên công việc");
      return;
    }

    if (name.trim().length === 1) {
      toast.warning("nhập nhiều hơn một ký tự");
      return;
    }

    onSubmits(name);
    setName("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (check) {
      setTimeout(() => {
        onSearch(value);
      }, 1000);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCheck(true);
    toast.success("Khởi động chế độ tìm kiếm");
  };

  return (
    <div className="innerTop">
      <h2>Welcome to Todo App!</h2>
      <div className="subInnerTop">
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={check ? "Tìm kiếm todo" : "Thêm một việc làm mới"}
            onChange={handleChange}
            value={name}
          />
          <button className="addTodo" type="submit">
            Thêm mới
          </button>
        </form>
        <button className="searchTodo" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
