import Link from "next/link";

import "./component.scss";

const SelfProject = ({ project }) => {
  const { title, pro } = project;
  return (
    <section className="selfProject">
      <h2 className="sub-title">{title}</h2>
      <ul className="list_project">
        {pro.map(({ name, subTitle, desc, code, link }, i) => {
          return (
            <li key={i} className="card_project">
              <div className="card_project-sub">
                <div>
                  <h3>{name}</h3>
                  <p>{subTitle}</p>
                  <p>{desc}</p>
                </div>
                <div className="linkDemo">
                  <Link href={link} target="_blank">
                    Demo
                  </Link>
                  <Link href={code} target="_blank">
                    Code
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SelfProject;
