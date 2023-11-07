import Navigo from "navigo";
import { Error } from "../Error";

const routerEl = new Navigo("/", { linksSelector: "a" });

function render(content) {
  document.querySelector("#app").innerHTML = content;
}

export const router = (routerA, Default) => {
  let html = /\{\w*\}/g;

  routerA.forEach((item) => {
    routerEl.on(item.path, (e = {}) => {
      let htmls = Default().replace(html, item.component(e));
      return render(htmls);
    });
    routerEl.notFound(function () {
      return render(Error());
    });
    routerEl.resolve();
  });
};

//Back
window.navigate = (e) => {
  return routerEl.navigate(e);
};
