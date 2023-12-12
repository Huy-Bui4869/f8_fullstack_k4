import data from "~/data/packages.json";

const Packages = () => {
  const { packages } = data;

  return (
    <section className="packages" id="packages">
      <h2 className="headingSection">
        <span>Ư</span>
        <span>U</span>
        <span className="space"></span>
        <span>Đ</span>
        <span>Ã</span>
        <span>I</span>
      </h2>

      <div className="boxContainer">
        {packages?.map(
          ({ id, src, title, desc, introduce, price, subPrice }) => (
            <div className="box" key={id}>
              <img
                src={`https://code-fullstack-exercise49.vercel.app/${src}`}
                alt={title}
              />
              <div className="content">
                <h3 className="text--black_orange">
                  <i className="fa-solid fa-location-dot"></i> {title}
                </h3>
                <p>{desc}</p>
                <p>{introduce}</p>
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
                <div className="boxPrice text--black_orange">
                  {price} <span>{subPrice}</span>
                </div>
                <button className="btnGlobals">Đặt ngay</button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Packages;
