"use client";
import useSWR, { mutate } from "swr";
import Link from "next/link";

import "./HomeGallery.scss";

import SERVER_API, { endpoint } from "~/config/config";
import Loading from "~/components/Loading/Loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

const HomeGallery = () => {
  const {
    data: listLibrary,
    isLoading,
    error,
    mutate,
  } = useSWR(`${SERVER_API}${endpoint.pages}`, fetcher);

  if (error) {
    <h1>Đã có lỗi xảy ra</h1>;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {listLibrary.map(({ home, galleryBox }, i) => {
            let name = home.name.toLowerCase();

            if (name === "rydney") {
              name = "s" + name.slice(1);
            }
            {
              name = name === "egypt" ? "Tổng hợp" : name;
            }

            return (
              <section className={name} id={name} key={i}>
                <h2 className="headingSection">
                  {name.split("").map((value, i) => {
                    if (!value.length) {
                      return <span className="space" key={i}></span>;
                    }
                    return <span key={i}>{value}</span>;
                  })}
                </h2>

                <div className="boxContainer">
                  {galleryBox.map(({ id, src }) => (
                    <div className="box" key={id}>
                      <img src={`https://api-pages.vercel.app/${src}`} />
                      <div className="content">
                        <h3>Tổng hợp</h3>
                        <p>Tổng Họp Những Bức Ảnh Đẹp Nhất Của {home.name}</p>
                        <Link
                          href={name === "Tổng hợp" ? "/" : "#"}
                          className="btnGlobals"
                          style={{ color: "#fefefe" }}
                        >
                          {name === "Tổng hợp" ? "Trang chủ" : "Đặt ngay"}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </>
      )}
    </>
  );
};

export default HomeGallery;
