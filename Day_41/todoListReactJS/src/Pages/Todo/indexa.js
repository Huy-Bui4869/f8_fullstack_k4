import React, { Component, useState, Fragment, useCallback } from "react";
import { toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";
import FormTodo from "./FormTodo/FormTodo";
import { NodeItem, TodoItem } from "./TodoItem/TodoItem";
import client from "../../config/client";
import Loading from "../../components/Loading";

export class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listTodos: [],
      isCheck: true,
    };
  }
  //check login.
  checkEmail = () => {
    const aplKey = localStorage.getItem("aplKey");
    const email = localStorage.getItem("email");

    if (aplKey || email) {
      //Lấy ra danh sách và render lên UI.
      this.getListTodo();
    } else {
      this.getAPIKey();
    }
  };

  //lấy apiKey, email.
  getAPIKey = async () => {
    try {
      const email = window.prompt(
        "Please enter your email:",
        "example@example.com"
      );

      this.state.loading = true;
      const { response: res, data } = await client.get(
        `/api-key?email=${email}`
      );
      this.state.loading = false;
      if (!res.ok) {
        throw new Error("Email không tồn tại trong dữ liệu");
      }

      if (res.ok) {
        const apiKey = data.data.apiKey;
        localStorage.setItem("apiKey", apiKey);
        localStorage.setItem("email", email);

        toast.info(`Chào mừng bạn ${localStorage.getItem("email")}`);
        this.getListTodo();
      }
    } catch (e) {
      if (e.message === "Email không tồn tại trong dữ liệu") {
        localStorage.removeItem("apiKey");
        localStorage.removeItem("email");
        toast.error(e.message);
        setTimeout(() => {
          this.state.isCheck = true;
          window.location.reload();
        }, 2000);
      }
    }
  };
  //Lấy danh sách todoList.
  getListTodo = async (query = {}) => {
    try {
      let queryString = new URLSearchParams(query).toString();
      queryString = queryString ? "?" + queryString : "";
      let arrTodo = [];
      console.log(queryString);

      this.state.loading = true;
      client.setToken(localStorage.getItem("apiKey"));
      const { response, data } = await client.get(`/todos${queryString}`);

      if (!response.ok) {
        throw new Error("Unauthorize");
      }

      if (response.ok) {
        // const arrTodo = data.data.listTodo;
        arrTodo = [...data.data.listTodo];
        // console.log(arrTodo);
        this.state.listTodos = arrTodo;
        this.setState({ listTodos: arrTodo });
        this.state.loading = false;
        // console.log(this.state.listTodos);
      }
    } catch (e) {
      this.state.loading = false;
      if (e.message === "Unauthorize") {
        toast.error("Có lỗi xảy ra vui lòng reload lại trang");
        setTimeout(() => {
          this.getAPIKey();
        }, 2000);
      }
    }
  };

  //Thêm todo lên API
  getAddTodo = async (todo) => {
    try {
      this.state.loading = true;
      client.setToken(localStorage.getItem("apiKey"));
      const { response: res, data } = await client.post("/todos", { todo });
      this.state.loading = false;

      if (res.status === 401) {
        throw new Error("Unauthorize");
      }

      const listTodo = [data.data, ...this.state.listTodos];
      this.state.listTodos = listTodo;
      this.setState({ listTodo: listTodo });

      toast.success("Thêm bài viết thành công");
    } catch (e) {
      if (e.message === "Unauthorize") {
        toast.error("Có lỗi xảy ra vui lòng reload lại trang");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  //xóa todo
  handleRemove = async (_id) => {
    console.log(`id cần xóa ${_id}`);
    try {
      // client.setToken(localStorage.getItem("apikey"));
      const { response, data } = await client.delete(`/todos/${_id}`);

      if (!response.ok) {
        throw new Error("Unauthorize");
      }

      const updatedTodos = this.state.listTodos.filter((todo) => {
        return todo._id !== _id;
      });

      this.setState({ listTodos: updatedTodos });
    } catch (e) {
      if (e.message === "Unauthorize") {
        toast.error("Có lỗi xảy ra vui lòng reload lại trang");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  //sửa todo
  handleUpdate = async (_id, todo) => {
    console.log(`id cần update ${_id}`);
    console.log(todo);
    try {
      // client.setToken(localStorage.getItem("apikey"));
      const { response, data } = await client.patch(`/todos/${_id}`, { todo });

      if (!response.ok) {
        throw new Error("Unauthorize");
      }
    } catch (e) {
      if (e.message === "Unauthorize") {
        toast.error("Có lỗi xảy ra vui lòng reload lại trang");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  componentDidMount() {
    // console.log("2.componentDidMount");
  }

  handleSearch = (value) => {
    // console.log(`value tim kiem_${value}`);
    this.getListTodo({ q: value });
    // debounceDropDown(value);
  };

  render() {
    // console.log("1.render");

    if (this.state.isCheck) {
      this.checkEmail();
      this.state.isCheck = false;
      console.log("check sau khi render", this.state.isCheck);
    }

    return (
      <Fragment>
        <div className="wrapper">
          <FormTodo onSubmits={this.getAddTodo} onSearch={this.handleSearch} />
          <ul className="listTodo">
            {this.state.listTodos.length === 0 ? (
              <NodeItem />
            ) : (
              this.state.listTodos.map((todo) => {
                return (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onRemove={this.handleRemove}
                    onUpdate={this.handleUpdate}
                  />
                );
              })
            )}
          </ul>
        </div>
        {this.state.loading && <Loading />}
      </Fragment>
    );
  }
}

export default Todo;
