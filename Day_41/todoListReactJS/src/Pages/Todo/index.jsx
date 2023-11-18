import React, { Fragment, Component } from "react";
import { toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";
import FormTodo from "./FormTodo/FormTodo";
import { NodeItem, TodoItem } from "./TodoItem/TodoItem";
import client from "../../config/client";
import Loading from "../../components/Loading";

// function Todo() {
//   const [loadings, setLoading] = useState(false);
//   const [todoList, setTodoList] = useState([]);

//   useEffect(() => {
//     const aplKey = localStorage.getItem("aplKey");
//     const email = localStorage.getItem("email");
//     console.log("useEffect");

//     if (aplKey || email) {
//       //Lấy ra danh sách và render lên UI.
//       getListTodo();
//     } else {
//       getAPIKey();
//     }
//   }, []);

//   //lấy apiKey, email.
//   const getAPIKey = async () => {
//     try {
//       const email = window.prompt(
//         "Please enter your email:",
//         "example@example.com"
//       );

//       setLoading(true);
//       const { response: res, data } = await client.get(
//         `/api-key?email=${email}`
//       );
//       setLoading(false);
//       if (!res.ok) {
//         throw new Error("Email không tồn tại trong dữ liệu");
//       }

//       if (res.ok) {
//         const apiKey = data.data.apiKey;
//         localStorage.removeItem("apiKey");
//         localStorage.removeItem("email");
//         localStorage.setItem("apiKey", apiKey);
//         localStorage.setItem("email", email);

//         toast.info(`Chào mừng bạn ${localStorage.getItem("email")}`);
//         getListTodo();
//       }
//     } catch (e) {
//       if (e.message === "Email không tồn tại trong dữ liệu") {
//         localStorage.removeItem("apiKey");
//         localStorage.removeItem("email");
//         toast.error(e.message);
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       }
//     }
//   };
//   //Lấy danh sách todoList.
//   const getListTodo = async (query = {}) => {
//     try {
//       let queryString = new URLSearchParams(query).toString();
//       queryString = queryString ? "?" + queryString : "";
//       let arrTodo = [];

//       setLoading(true);
//       client.setToken(localStorage.getItem("apiKey"));
//       const { response, data } = await client.get(`/todos${queryString}`);

//       setLoading(false);
//       if (!response.ok) {
//         throw new Error("Unauthorize");
//       }

//       arrTodo = [...data.data.listTodo];
//       setTodoList(arrTodo);
//     } catch (e) {
//       if (e.message === "Unauthorize") {
//         toast.error("Có lỗi xảy ra vui lòng reload lại trang");
//         setTimeout(() => {
//           getAPIKey();
//         }, 2000);
//       }
//     }
//   };

//   //Thêm todo lên API
//   const getAddTodo = async (todo) => {
//     try {
//       setLoading(true);
//       client.setToken(localStorage.getItem("apiKey"));
//       const { response: res, data } = await client.post("/todos", { todo });
//       setLoading(false);

//       if (res.status === 401) {
//         throw new Error("Unauthorize");
//       }

//       setTodoList([data.data, ...todoList]);
//       // const listTodo = [data.data, ...todoList];
//       // setTodoList(listTodo);

//       toast.success("Thêm bài viết thành công");
//     } catch (e) {
//       if (e.message === "Unauthorize") {
//         toast.error("Có lỗi xảy ra vui lòng reload lại trang");
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       }
//     }
//   };

//   //xóa todo
//   const handleRemove = async (_id) => {
//     try {
//       setLoading(true);
//       // client.setToken(localStorage.getItem("apikey"));
//       const { response } = await client.delete(`/todos/${_id}`);
//       setLoading(false);

//       if (!response.ok) {
//         throw new Error("Unauthorize");
//       }

//       const updatedTodos = todoList.filter((todo) => {
//         return todo._id !== _id;
//       });

//       setTodoList(updatedTodos);
//     } catch (e) {
//       if (e.message === "Unauthorize") {
//         toast.error("Có lỗi xảy ra vui lòng reload lại trang");
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       }
//     }
//   };

//   //sửa todo
//   const handleUpdate = async (_id, todo) => {
//     try {
//       setLoading(true);
//       // client.setToken(localStorage.getItem("apikey"));
//       const { response } = await client.patch(`/todos/${_id}`, { todo });
//       setLoading(false);

//       if (!response.ok) {
//         throw new Error("Unauthorize");
//       }
//     } catch (e) {
//       if (e.message === "Unauthorize") {
//         toast.error("Có lỗi xảy ra vui lòng reload lại trang");
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       }
//     }
//   };

//   const handleSearch = (value) => {
//     console.log(`value tim kiem_${value}`);
//     getListTodo({ q: value });
//   };

//   return (
//     <Fragment>
//       {console.log("render")}
//       <div className="wrapper">
//         <FormTodo onSubmits={getAddTodo} onSearch={handleSearch} />
//         <ul className="listTodo">
//           {todoList.length === 0 ? (
//             <NodeItem />
//           ) : (
//             todoList.map((todo) => {
//               return (
//                 <TodoItem
//                   key={todo._id}
//                   todo={todo}
//                   onRemove={handleRemove}
//                   onUpdate={handleUpdate}
//                 />
//               );
//             })
//           )}
//         </ul>
//       </div>
//       {loadings && <Loading />}
//     </Fragment>
//   );
// }

// export default Todo;

export class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listTodos: [],
      isCheck: true,
      loading: true,
    };
  }
  //check login.
  checkEmail = () => {
    const aplKey = localStorage.getItem("aplKey");
    const email = localStorage.getItem("email");

    if (aplKey || email) {
      //Lấy ra danh sách và render lên UI.
      // this.getListTodo();
      return true;
    } else {
      // this.getAPIKey();
      return false;
    }
  };

  //lấy apiKey, email.
  getAPIKey = async () => {
    try {
      const email = window.prompt(
        "Please enter your email:",
        "example@example.com"
      );

      // this.state.loading = true;
      const { response: res, data } = await client.get(
        `/api-key?email=${email}`
      );
      // this.state.loading = false;
      if (!res.ok) {
        throw new Error("Email không tồn tại trong dữ liệu");
      }

      if (res.ok) {
        const apiKey = data.data.apiKey;
        localStorage.setItem("apiKey", apiKey);
        localStorage.setItem("email", email);
        // console.log("res")
        // this.setState({listTodos : })
        // toast.info(`Chào mừng bạn ${localStorage.getItem("email")}`);
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

  componentDidMount() {
    // console.log("2.componentDidMount");
    const { isCheck } = this.state;
    // if (this.state.isCheck) {
    //   this.checkEmail();
    //   // this.state.isCheck = false;
    // } else {
    //   alert("123");
    // }
    // if()
    // this.checkEmail()
    this.getAPIKey();
  }

  handleSearch = (value) => {
    // console.log(`value tim kiem_${value}`);
    this.getListTodo({ q: value });
  };

  render() {
    return (
      <Fragment>
        <div className="wrapper">
          <FormTodo onSubmits={this.getAddTodo} onSearch={this.handleSearch} />
          <ul className="listTodo">
            <NodeItem />
            {/* {this.state.listTodos.length === 0 ? (
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
            )} */}
          </ul>
        </div>
        {/* {this.state.loading && <Loading />} */}
      </Fragment>
    );
  }
}

export default Todo;

// //Lấy danh sách todoList.
// getListTodo = async (query = {}) => {
//   // console.log(first)
//   try {
//     let queryString = new URLSearchParams(query).toString();
//     queryString = queryString ? "?" + queryString : "";
//     let arrTodo = [];
//     console.log(queryString);

//     // this.state.loading = true;
//     client.setToken(localStorage.getItem("apiKey"));
//     const { response, data } = await client.get(`/todos${queryString}`);

//     if (!response.ok) {
//       throw new Error("Unauthorize");
//     }

//     if (response.ok) {
//       arrTodo = [...data.data.listTodo];
//       this.state.listTodos = arrTodo;
//       this.setState({ listTodos: arrTodo });
//       // this.state.loading = false;
//     }
//   } catch (e) {
//     // this.state.loading = false;
//     if (e.message === "Unauthorize") {
//       toast.error("Có lỗi xảy ra vui lòng reload lại trang");
//       // setTimeout(() => {
//       //   this.getAPIKey();
//       // }, 2000);
//     }
//   }
// };

// //Thêm todo lên API
// getAddTodo = async (todo) => {
//   try {
//     // this.state.loading = true;
//     client.setToken(localStorage.getItem("apiKey"));
//     const { response: res, data } = await client.post("/todos", { todo });
//     // this.state.loading = false;

//     if (res.status === 401) {
//       throw new Error("Unauthorize");
//     }

//     const listTodo = [data.data, ...this.state.listTodos];
//     this.state.listTodos = listTodo;
//     this.setState({ listTodo: listTodo });

//     toast.success("Thêm bài viết thành công");
//   } catch (e) {
//     if (e.message === "Unauthorize") {
//       toast.error("Có lỗi xảy ra vui lòng reload lại trang");
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000);
//     }
//   }
// };

// //xóa todo
// handleRemove = async (_id) => {
//   console.log(`id cần xóa ${_id}`);
//   try {
//     // client.setToken(localStorage.getItem("apikey"));
//     const { response, data } = await client.delete(`/todos/${_id}`);

//     if (!response.ok) {
//       throw new Error("Unauthorize");
//     }

//     const updatedTodos = this.state.listTodos.filter((todo) => {
//       return todo._id !== _id;
//     });

//     this.setState({ listTodos: updatedTodos });
//   } catch (e) {
//     if (e.message === "Unauthorize") {
//       toast.error("Có lỗi xảy ra vui lòng reload lại trang");
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000);
//     }
//   }
// };

// //sửa todo
// handleUpdate = async (_id, todo) => {
//   console.log(`id cần update ${_id}`);
//   console.log(todo);
//   if (!todo.length) {
//     return;
//   }
//   try {
//     // client.setToken(localStorage.getItem("apikey"));
//     const { response } = await client.patch(`/todos/${_id}`, { todo });

//     if (!response.ok) {
//       throw new Error("Unauthorize");
//     }
//   } catch (e) {
//     if (e.message === "Unauthorize") {
//       toast.error("Có lỗi xảy ra vui lòng reload lại trang");
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000);
//     }
//   }
// };
