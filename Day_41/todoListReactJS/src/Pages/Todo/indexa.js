import { useState, Fragment } from "react";

import FormTodo from "./FormTodo/FormTodo";
import ListTodo from "./ListTodo/ListTodo";
import Client from "../../config/client";

import Loading from "../../components/Loading";

const client = new Client();
console.log(client);
function Todo() {
  const [loading, setLoading] = useState(false);

  if (login()) {
    console.log("có email");
  } else {
    console.log("không có gì");
    getAPIKey();
  }

  function login() {
    const aplKey = localStorage.getItem("aplKey");
    const email = localStorage.getItem("email");
    if (aplKey && email) {
      return true;
    } else {
      return false;
    }
  }

  async function getAPIKey() {
    let email = window.prompt(
      "Please enter your email:",
      "example@example.com"
    );

    console.log(email);
  }
  // const getTodos = async (apiKey) => {
  //   if (!loading) {
  //     setLoading(true);
  //     const { data, res } = await client.get("/todos", filters, apiKey);
  //     if (res.ok) {
  //       if (data && data.data) {
  //         const todoList = data.data.listTodo.map((item) => {
  //           const newTodo = {
  //             id: item._id,
  //             todo: item.todo,
  //             createdAt: item.createdAt,
  //             isCompleted: item.isCompleted,
  //           };
  //           return newTodo;
  //         });
  //         setTodosList(todoList);
  //       }
  //     }
  //     setLoading(false);
  //   }
  // };

  return (
    <Fragment>
      <div className="wrapper">
        <FormTodo />
        <ListTodo />
      </div>
      {loading && <Loading />}
    </Fragment>
  );
}

export default Todo;
