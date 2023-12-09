import "./component.scss";

const History = ({ history }) => {
  const { title, arr } = history;

  return (
    <div className="aside">
      <h2 className="sub-title">{title}</h2>
      <ul>
        {arr.map(({ time, content }, i) => {
          return (
            <li key={i} style={{ borderBottom: "1px solid #8080804e" }}>
              <div>
                <h3 style={{ fontWeight: "700", display: "inline-block" }}>
                  {time}:
                </h3>
                {content}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default History;
