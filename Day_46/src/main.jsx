//Import từ node_modules
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//Import CSS_scss
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/globalStyle.scss";

//Import từ project
import App from "./App.jsx";
import { store } from "./stores/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// npm i react-toastify
