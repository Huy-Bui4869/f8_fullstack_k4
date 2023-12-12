"use client";

const Services = ({ servicesBox }) => {
  return (
    <section className="services" id="services">
      <h2 className="headingSection">
        <span>D</span>
        <span>Ị</span>
        <span>C</span>
        <span>H</span>
        <span className="space"></span>
        <span>V</span>
        <span>Ụ</span>
      </h2>
      <div className="boxContainer">
        {servicesBox?.map(({ id, icon, h3 }) => {
          return (
            <div className="box" key={id}>
              <i className={icon}></i>
              <h3 className="text--black_orange">{h3}</h3>
              <p>Some Text...</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
