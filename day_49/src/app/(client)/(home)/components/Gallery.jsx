"use client";
import Link from "next/link";
import { Fragment } from "react";

const Gallery = ({ galleryBox, listPage }) => {
  // console.log(galleryBox);
  // console.log(listPage);
  // console.log(listPage.map(({ home }) => home.name));
  return (
    <section className="gallery" id="gallery">
      <h2 className="headingSection">
        <span>T</span>
        <span>H</span>
        <span>Ư</span>
        <span className="space"></span>
        <span>V</span>
        <span>I</span>
        <span>Ệ</span>
        <span>N</span>
      </h2>

      <div className="boxContainer">
        {galleryBox.map(({ id, src }) => (
          <Fragment key={id}>
            <div className="box">
              <img src={`https://api-pages.vercel.app/${src}`} />
              <div className="content">
                <h3>Ảnh chụp</h3>
                <p>
                  những bức ảnh đẹp nhất về chuyến du lịch của bạn sx được chia
                  sẻ lên đây
                </p>
                <Link
                  href={"/gallery"}
                  className="btnGlobals"
                  style={{ fontWeight: 700 }}
                >
                  Xem thêm
                </Link>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

// import useSWR, { mutate } from "swr";
// import SERVER_API, { endpoint } from "~/config/config";

// const fetcher = (url) => fetch(url).then((res) => res.json());
// const { data, isLoading, error, mutate } = useSWR(
//   `${SERVER_API}${endpoint.pages}`,
//   fetcher
// );

// if (error) {
//   <h1>Xảy ra lỗi</h1>;
// }
