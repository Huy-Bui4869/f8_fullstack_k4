import MyHobbies from "./components/MyHobbies";
import MySkills from "./components/MySkills";
import SelfProject from "./components/SelfProject";
import History from "./components/History";
import SocialContact from "./components/SocialContact";

import { getDictionary } from "../../../getDictionaries";

const Home = async ({ params }) => {
  const { lang } = params;
  if (!lang) {
    console.log("ok");
  }

  const dictionary = await getDictionary(lang);

  const { title, desc_title, about, project, hobbies, skill, history } =
    dictionary.home;

  return (
    <main>
      <div className="subMain">
        <div className="box_title-page">
          <h1 className="title-page">{title}</h1>
          <span>{desc_title}</span>
        </div>
        <div className="container">
          <aside>
            <div className="avatar">
              <div className="logo_avatar">
                <img
                  src="https://code-fullstack-exercise48.vercel.app/f8.jpg"
                  alt=""
                />
              </div>
              <p>Front-end developer</p>
            </div>
            <MySkills skill={skill} />
            <History history={history} />
          </aside>
          <div className="box-content">
            <SocialContact about={about} />
            <SelfProject project={project} />
            <MyHobbies hobbies={hobbies} />
          </div>
        </div>
        <p style={{ textAlign: "center", paddingTop: "8px", color: "#fb923c" }}>
          © 2023 The Example Name. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default Home;
