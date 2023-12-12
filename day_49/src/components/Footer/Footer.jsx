import Link from "next/link";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="boxContainer">
        <div className="box">
          <Link href="/" className="logo text--white_orange">
            Stravel
          </Link>
          <p>
            Trải Qua 17 Năm Phát Triển Bền Vững, STravel Đã Ghi Dấu Ấn Của Mình
            Với Thông Điệp
            <br />
            “Nâng Tầm Trải Nghiệm Từng Chuyến Đi”
          </p>
        </div>

        <div className="box">
          <h3 className="text--white_orange">Chi Nhánh Chính</h3>
          <ul>
            <li>
              <Link href={"#home"}>Hà Nội</Link>
            </li>
            <li>
              <Link href={"#home"}>Ấn Độ</Link>
            </li>
            <li>
              <Link href={"#home"}>Mỹ</Link>
            </li>
            <li>
              <Link href={"#home"}>Nhật bản</Link>
            </li>
            <li>
              <Link href={"#home"}>Pháp</Link>
            </li>
          </ul>
        </div>

        <div className="box">
          <h3 className="text--white_orange">Chuyển Hướng</h3>
          <ul>
            <li>
              <Link href={"#home"}>Trang Chủ</Link>
            </li>
            <li>
              <Link href={"#blook"}>Đặt Lịch</Link>
            </li>
            <li>
              <Link href={"#packages"}>Ưu Đãi</Link>
            </li>
            <li>
              <Link href={"#services"}>Dịch vụ</Link>
            </li>
            <li>
              <Link href={"#gallery"}>Thư Viện</Link>
            </li>
            <li>
              <Link href={"#review"}>Đánh giá</Link>
            </li>
            <li>
              <Link href={"#contact"}>Liên hệ</Link>
            </li>
          </ul>
        </div>

        <div className="box">
          <h3 className="text--white_orange">Tương Tác</h3>
          <ul>
            <li>
              <Link href={"#home"}>Facebook</Link>
            </li>
            <li>
              <Link href={"#home"}>Instagram</Link>
            </li>
            <li>
              <Link href={"#home"}>Twitter</Link>
            </li>
            <li>
              <Link href={"#home"}>Linkedin</Link>
            </li>
          </ul>
        </div>
      </div>
      <h1 className="credit">
        Created By <span>STRAVEL</span> | All Rights Reserved!
      </h1>
    </footer>
  );
};

export default Footer;
