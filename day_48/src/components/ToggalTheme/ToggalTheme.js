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
      console.log("treen");
      setIsLight(false);
      localStorage.setItem("prefered-theme", "lightTheme");
    } else if (theme === "darkTheme") {
      console.log("duoi");
      setIsLight(true);
      localStorage.setItem("prefered-theme", "darkTheme");
    }
    setTheme();
  }, []);

  useEffect(() => {
    // console.log(`[isLight]`);
    if (isLight) {
      localStorage.setItem("prefered-theme", "darkTheme");
    } else {
      localStorage.setItem("prefered-theme", "lightTheme");
    }
    setTheme();
  }, [isLight]);

  return (
    <div className="theme-switcher items-center text--colors_default bg--default">
      <button
        className={`${isLight ? "dark" : "light"}-mode-switch`}
        onClick={handleDarkMode}
      >
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
// useEffect(() => {
//   const theme = localStorage.getItem("prefered-theme");
//   console.log(theme);
//   if (theme === null) {
//     setIsLight(true);

//   } else {
//     setIsLight(theme === "darkTheme" ? false : true);
//   }
//   if (!isLight) {
//     localStorage.setItem("prefered-theme", "lightTheme");
//   } else {
//     localStorage.setItem("prefered-theme", "darkTheme");
//   }

//   const setTheme = () => {
//     const root = document.documentElement;
//     const operatingSystemThemeDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     );
//     if (theme === "darkTheme" && operatingSystemThemeDark.matches) {
//       root.classList.add("dark");
//     }

//     if (theme === "lightTheme" || theme === null) {
//       root.classList.remove("dark");
//     }
//   };

//   setTheme();
// }, []);
