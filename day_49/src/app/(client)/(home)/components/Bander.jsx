"use client";
import Link from "next/link";
import { Carousel, Radio } from "antd";
// import { DotPosition } from "antd/es/carousel";

import "./style.scss";

const Bander = () => {
  return (
    <section className="bander" id="bander">
      <div className="content">
        <h3 className="text--white_orange">Mọi chuyến đi đều đáng giá</h3>
        <p>
          Khám Phá Các Vùng Đất Mới Cùng Chúng Tôi <br />
          Những Chuyến Đi Đang Chờ Đợi Bạn
        </p>
        <Link href={"#packages"} className="text--white_black btnGlobals">
          Khám Phá Ngay
        </Link>
      </div>

      <Carousel
        className="boxCarousel"
        autoplay
        dots
        pauseOnDotsHover
        pauseOnHover
        draggable
        autoplaySpeed={5000}
      >
        <div>
          <video
            loop
            autoPlay
            muted
            className="video"
            src="https://code-fullstack-exercise49.vercel.app/videos/vid-1.mp4"
          ></video>
        </div>
        <div>
          <video
            loop
            autoPlay
            muted
            className="video"
            src="https://code-fullstack-exercise49.vercel.app/videos/vid-2.mp4"
          ></video>
        </div>
        <div>
          <video
            loop
            autoPlay
            muted
            className="video"
            src="https://code-fullstack-exercise49.vercel.app/videos/vid-3.mp4"
          ></video>
        </div>
      </Carousel>
    </section>
  );
};

export default Bander;
