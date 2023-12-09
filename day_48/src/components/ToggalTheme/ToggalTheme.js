"use client";
import { useState, useEffect } from "react";

const ToggalTheme = () => {
  const storedTheme = localStorage.getItem("prefered-theme");

  const checkTheme = () => {
    if (storedTheme === "darkTheme") {
      return false;
    }
    return true;
  };

  const [isLight, setIsLight] = useState(checkTheme);

  function setDarkTheme() {
    setIsLight(!isLight);
    if (!isLight) {
      localStorage.setItem("prefered-theme", "lightTheme");
    } else {
      localStorage.setItem("prefered-theme", "darkTheme");
    }
  }

  useEffect(() => {
    const setTheme = () => {
      const root = document.documentElement;
      const operatingSystemThemeDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      if (storedTheme === "darkTheme" && operatingSystemThemeDark.matches) {
        root.classList.add("dark");
      }
      //   if (storedTheme === "darkTheme") {
      //     root.classList.add("dark");
      //   }
      if (storedTheme === "lightTheme") {
        root.classList.remove("dark");
      }
    };
    setTheme();
  }, [storedTheme]);

  return (
    <div className="theme-switcher items-center text--colors_default bg--default">
      <button
        className={`${isLight ? "dark" : "light"}-mode-switch`}
        onClick={setDarkTheme}
      >
        {/* cursor-pointer  w-[40px] h-[40px] pl-12 */}
        <i
          className={`fa-solid ${!isLight ? "fa-sun" : "fa-moon"}`}
          style={{ fontSize: "2rem", padding: "2px", color: "#71717a" }}
        ></i>
      </button>
    </div>
  );
};

export default ToggalTheme;

{
  /* <button
        className={`dark-mode-switch cursor-pointer  w-[100px] h-[40px]
        border ${!isLight && "hidden"}`}
        onClick={setDarkTheme}
      >
        <i className={`fa-solid fa-moon`}></i>
      </button>
      <button
        className={`light-mode-switch cursor-pointer  w-[100px] h-[40px]
        border ${isLight && "hidden"}`}
        onClick={setLightTheme}
      >
        <i className={`fa-solid fa-sun`}></i>
      </button> */
}
