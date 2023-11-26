import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import PlayHeader from "./components/PlayHeader/PlayHeader";
import TableHistory from "./components/TableHistory/TableHistory";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  useEffect(() => {
    toast.info("Chào mừng bạn đến với trò chơi đếm số");
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Fragment>
      <button className="toggelMode" onClick={toggleTheme}>
        <i
          className={`fa-solid ${theme === "light" ? "fa-moon" : "fa-sun"}`}
          style={{ color: `${theme === "light" ? "#2c2c2c" : "#fff"}` }}
        ></i>
      </button>
      <PlayHeader />
      <TableHistory />
    </Fragment>
  );
}

export default App;
