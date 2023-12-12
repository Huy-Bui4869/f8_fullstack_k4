"use client";
import { useState, useEffect } from "react";

const ToggalTheme = () => {
  const [isLight, setIsLight] = useState(null);

  const setTheme = () => {
    const root = document.documentElement;
    const operatingSystemThemeDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    if (isLight && operatingSystemThemeDark.matches) {
      root.classList.add("dark");
    }

    if (!isLight) {
      root.classList.remove("dark");
    }
  };

  const handleDarkMode = () => {
    setIsLight(!isLight);
  };

  useEffect(() => {
    const theme = localStorage.getItem("prefered-theme");

    if (theme === null || theme === "lightTheme") {
      // console.log("treen");
      setIsLight(false);
      localStorage.setItem("prefered-theme", "lightTheme");
    } else if (theme === "darkTheme") {
      // console.log("duoi");
      setIsLight(true);
      localStorage.setItem("prefered-theme", "darkTheme");
    }
    setTheme();
  }, []);

  useEffect(() => {
    if (isLight) {
      localStorage.setItem("prefered-theme", "darkTheme");
    } else {
      localStorage.setItem("prefered-theme", "lightTheme");
    }
    setTheme();
  }, [isLight]);

  return (
    <div className="theme-switcher items-center ">
      <button
        className={`${
          isLight ? "dark" : "light"
        }-mode-switch text--white_orange`}
        style={{ width: "25px" }}
        onClick={handleDarkMode}
      >
        <i
          className={`fa-regular ${!isLight ? "fa-sun" : "fa-moon"}`}
          style={{ fontSize: "25px", padding: "2px" }}
        ></i>
      </button>
    </div>
  );
};

export default ToggalTheme;
