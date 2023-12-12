import Image from "next/image";

import "./style.scss";

import homeBgPromo from "~/assets/image/homeBgPromo.jpg";

const Promo = () => {
  return (
    <section className="promo" id="promo">
      <h2 className="headingSection">
        <span>C</span>
        <span>H</span>
        <span>O</span>
        <span className="space"></span>
        <span>B</span>
        <span>Ạ</span>
        <span>N</span>
      </h2>
      <div className="boxContent">
        <div className="box">
          <Image src={homeBgPromo} alt="logoPromo" priority />
          <div className="content">
            <h3 className="text--black_orange">
              <i className="fa-solid fa-location-dot"></i> Tokyo
            </h3>
            <p>Truyền Thống Và Tương Lai</p>
            <p>Ưu Đãi 6.500.000 Cho 1người/7ngày</p>
            <ul className="listStar">
              <li>
                <i className="fa-solid fa-star"></i>
              </li>
              <li>
                <i className="fa-solid fa-star"></i>
              </li>
              <li>
                <i className="fa-solid fa-star"></i>
              </li>
              <li>
                <i className="fa-solid fa-star"></i>
              </li>
              <li>
                <i className="fa-regular fa-star"></i>
              </li>
            </ul>
            <button className="btnGlobals">Đặt ngay</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
