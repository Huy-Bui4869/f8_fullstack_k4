import Image from "next/image";

import bookImage from "~/assets/image/bookImage.svg";

import data from "~/data/bookForm.json";

const Book = () => {
  const { heading, datas } = data;
  console.log("heading");
  console.log(heading);
  return (
    <section className="book" id="book">
      <h2 className="headingSection">
        <span>T</span>
        <span>Ì</span>
        <span>M</span>
        <span className="space"></span>
        <span>Ư</span>
        <span>U</span>
        <span className="space"></span>
        <span>Đ</span>
        <span>Ã</span>
        <span>I</span>
      </h2>

      <div className="book_inner">
        <div className="image">
          <Image src={bookImage} alt="logoBook" />
        </div>

        <form action="">
          {datas?.map(({ title, type, place }, i) => {
            return (
              <div className="inputBox" key={i}>
                <h3 className="text--gray_orange">{title}</h3>
                <input
                  type={type}
                  placeholder={place}
                  className="border--gray_orange text--black_while"
                />
              </div>
            );
          })}
          <button className="btnGlobals">Tìm ngay</button>
        </form>
      </div>
    </section>
  );
};

export default Book;
