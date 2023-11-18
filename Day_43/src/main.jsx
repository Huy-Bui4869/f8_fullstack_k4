import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//css chung
import GlobalStyles from "./components/GlobalStyles/GlobalStyles.js";
import Provider from "./core/Provider.jsx";
//Thư viện toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles>
      <Provider>
        <App />
        <ToastContainer />
      </Provider>
    </GlobalStyles>
  </React.StrictMode>
);

// npm i react-toastify
