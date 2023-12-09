import "./component.scss";

const MySkills = ({ skill }) => {
  const { title, content } = skill;
  return (
    <div className="mySkills">
      <div className="aside">
        <h2 className="sub-title">{title}</h2>
        <ul>
          {content.map(({ title, content }, i) => {
            return (
              <li key={i}>
                <div>
                  <h3>{title}:</h3>
                  {content}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MySkills;
