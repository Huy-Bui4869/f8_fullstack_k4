import { useState, Fragment, useEffect } from "react";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { toast } from "react-toastify";
import { getProfile } from "./helpers/getProfile";

function App() {
  // console.log("1.bđ");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    // console.log("3.useEffect");
    // console.log("useEffect");
    const email = localStorage.getItem("email");
    const apikey = localStorage.getItem("apiKey");

    if (email && apikey) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, []);

  const handleLogin = (apiKey, email) => {
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("email", email);

    setCheck(true);
    getProfile().then((response) => {
      const { nameUser } = response;
      toast.success(` Chào mừng bạn ${nameUser}`);
    });
  };

  return (
    <Fragment>
      {/* {console.log("2.render")} */}
      <button
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("apiKey");
          localStorage.removeItem("email");
        }}
      >
        Click me
      </button>
      {check ? <Home /> : <Login onLogin={handleLogin} />}
    </Fragment>
  );
}

export default App;
