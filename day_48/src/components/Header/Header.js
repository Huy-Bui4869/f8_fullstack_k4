"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ToggalTheme from "../ToggalTheme/ToggalTheme";

import "./Header.scss";

import { i18n } from "../../../i18n.config";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [language, setLanguage] = useState(localStorage.getItem("lang"));

  const handleMultiLanguage = (e) => {
    if (!pathname || pathname === "/null") return `/${i18n.defaultLocale}`;

    const url = pathname === "/vi" ? "en" : "vi";

    localStorage.setItem("lang", url);
    setLanguage(url);
    router.push(`/${url}`);
  };

  useEffect(() => {
    // router.push(`/${language}`);
  }, []);

  return (
    <header>
      <ul className="list sub-header">
        <li>
          <Link href={"/"} className="link">
            <img
              src="https://code-fullstack-exercise48.vercel.app/_next/image?url=%2Ffavicon.ico&w=48&q=75"
              alt="logo"
              width={36}
            />
            <p>Fullstack.edu.vn F8</p>
          </Link>
        </li>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
      </ul>

      <ul className="list navbar">
        <li>
          <Link href={"/"}>
            <img
              src="https://code-fullstack-exercise48.vercel.app/_next/image?url=https%3A%2F%2Ffullstack.edu.vn%2Fstatic%2Fmedia%2Ff8-icon.18cd71cfcfa33566a22b.png&w=32&q=75"
              alt=""
            />
          </Link>
        </li>
        <li className="item">
          <Link href={"https://www.facebook.com"} target="_blank">
            <i className="fa-brands fa-square-facebook fa-bounce"></i>
          </Link>
        </li>
        <li className="item">
          <Link
            href={"https://github.com/Huy-Bui4869/f8_fullstack_k4"}
            target="_blank"
          >
            <i class="fa-brands fa-github fa-shake"></i>
          </Link>
        </li>
        <li>
          <ToggalTheme />
        </li>
        <li>
          <button className="languageBtn" onClick={handleMultiLanguage}>
            {language === "vi" ? "en" : "vi"}
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;

// const url = localStorage.getItem("lang");
// console.log("use", url);
// if (!url || url === null) {
//   return;
// }
// router.push(`/${url}`);
