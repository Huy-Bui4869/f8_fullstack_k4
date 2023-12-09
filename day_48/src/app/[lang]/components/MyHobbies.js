import "./component.scss";

const MyHobbies = ({ hobbies }) => {
  const { title, content } = hobbies;
  return (
    <section className="myHobbies">
      <h2 className="sub-title">{title}</h2>
      <div>
        {content.map((item, i) => {
          return <div key={i}>- {item}</div>;
        })}
      </div>
    </section>
  );
};

export default MyHobbies;
