import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyles from "./assets/GlobalStyles/GlobalStyles";
import { Auth0Provider } from "@auth0/auth0-react";

//Thư viện toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Provider from "./core/Provider.jsx";

const domain = "dev-vobg0icyc3m2vf5z.us.auth0.com";
const clientId = "eu5S4LoIJ4vLadbIBCYx7Vu7TcsZC6pp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <GlobalStyles>
        <Provider>
          <App />
          <ToastContainer />
        </Provider>
      </GlobalStyles>
    </Auth0Provider>
  </React.StrictMode>
);
