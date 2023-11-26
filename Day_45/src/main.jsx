//Import từ node_modules
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

//Import CSS_scss
import "react-toastify/dist/ReactToastify.css";

//Import từ project
import App from "./App.jsx";
import { store } from "./store/store.js";
import { GlobalStyle } from "./assets/scss/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle>
        <App />
        <ToastContainer />
      </GlobalStyle>
    </Provider>
  </React.StrictMode>
);
