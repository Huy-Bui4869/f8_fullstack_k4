"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./Header.scss";
import ToggalTheme from "../ToggalTheme/ToggalTheme";

const listGallery = ["home", "hawaii", "mumbai", "paris", "sydney", "tokyo"];

const Header = ({ check }) => {
  const path = usePathname();

  return (
    <header id="header">
      <Link href={"/"} className="logoPages">
        <span>S</span>TRAVEL
      </Link>

      {check === "a" && <h1>alo</h1>}

      <nav className="navbar">
        {path === "/" && (
          <ul>
            <li>
              <Link href={"#home"}>Trang chủ</Link>
            </li>
            <li>
              <Link href={"#book"}>Đặt lịch</Link>
            </li>
            <li>
              <Link href={"#packages"}>Ưu đãi</Link>
            </li>
            <li>
              <Link href={"#services"}>Dịch vụ</Link>
            </li>
            <li>
              <Link href={"#gallery"}>Thư viện</Link>
            </li>
            <li>
              <Link href={"#review"}>Đánh giá</Link>
            </li>
            <li>
              <Link href={"#contact"}>Liên hệ</Link>
            </li>
          </ul>
        )}

        {path === "/gallery" && (
          <ul>
            {listGallery.map((item, i) => {
              if (item === "home") {
                return (
                  <li key={i}>
                    <Link href={`#${item}`}>Tổng hợp</Link>
                  </li>
                );
              }
              return (
                <li key={i}>
                  <Link href={`#${item}`}>{item}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      <ul className="list-tool">
        <li>
          <ToggalTheme />
        </li>
        <li>
          <button className="text--white_orange">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </li>
        <li>
          <button className="text--white_orange">
            <i className="fa-solid fa-user"></i>
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
