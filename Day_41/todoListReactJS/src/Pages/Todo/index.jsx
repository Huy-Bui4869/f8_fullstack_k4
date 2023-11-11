import React, { Component, useState, Fragment } from "react";
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
  getListTodo = async () => {
    try {
      this.state.loading = true;
      client.setToken(localStorage.getItem("apiKey"));
      const { response, data } = await client.get(`/todos`);

      if (!response.ok) {
        throw new Error("Unauthorize");
      }

      if (response.ok) {
        const arrTodo = data.data.listTodo;
        console.log(arrTodo);
        this.state.listTodos = arrTodo;
        this.setState({ listTodos: arrTodo });
        this.state.loading = false;
        console.log(this.state.listTodos);
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

      console.log(data);

      if (res.status === 401) {
        throw new Error("Unauthorize");
      }

      if (res.ok) {
        const newItem = data.data;
        const listTodo = [newItem, ...this.state.listTodos];
        this.state.listTodos = listTodo;
        this.setState({ listTodo: listTodo });

        toast.info("Thêm bài viết thành công");
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

  handleSubmit = (todo) => {
    this.getAddTodo(todo);
  };

  componentDidMount() {
    //Chạy 1 lân khi render lần đầu tiên
    // this.checkEmail();
    // this.getListTodo();
    console.log("2.componentDidMount");
  }

  render() {
    console.log("1.render");

    if (this.state.isCheck) {
      this.checkEmail();
      this.state.isCheck = false;
      console.log("check sau khi render", this.state.isCheck);
    }

    return (
      <Fragment>
        <div className="wrapper">
          <FormTodo onSubmits={this.handleSubmit} />
          <ul className="listTodo">
            {this.state.listTodos.length === 0 ? (
              <NodeItem />
            ) : (
              this.state.listTodos.map(({ _id, todo }) => {
                console.log(_id);
                return <TodoItem key={_id} todo={todo} />;
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
