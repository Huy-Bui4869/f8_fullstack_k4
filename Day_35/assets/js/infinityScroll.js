import { client } from "./client.js";
import { config } from "./config.js";

const { PAGE_LIMIT } = config;
let currentPage = 1;
let isDrag = false;

const animationLoader = document.querySelector(".js-container-loading");

const app = {
  rootEl: document.querySelector("#rootEl"),
  query: {
    _sort: "id",
    _order: "desc",
    _limit: PAGE_LIMIT, //Giới hạn số lượng bài viết.
    _page: currentPage,
  },
  render: function (posts) {
    const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");
    isDrag = false;

    if (posts.length === 0) {
      return;
    }

    const div = document.createElement("div");
    div.innerHTML = `
      ${posts
        .map(
          ({ avatar, nickname, name, excerpt, urlContent }) => `
            <article class="article">
              <div class="avata-user">
                <div class="avata-user_inner">
                  <img src="${avatar}" alt="">
                </div>
              </div>

              <div class="content-posts">
                <div class="content-top">
                  <div class="content-top-left">
                    <div class="name-user">
                      <h3>${stripHtml(nickname)}</h3>
                      <h4>${stripHtml(name)}</h4>
                    </div>
                    <div class="desc">${stripHtml(excerpt)}</div>
                  </div>
                  <div class="btn">
                    <button class="btn-follow">Follow</button>
                  </div>
                </div>
                <div class="content-bottom">
                  <div class="image-content">
                    <img src="${urlContent}" alt="">
                  </div>
                  <ul class="list-utilities">
                    <li class="item-utilities">
                      <a href="#!"><i class="fa-solid fa-heart"></i></a>
                      <span>999k</span>
                    </li>
                    <li class="item-utilities">
                      <a href="#!"><i class="fa-solid fa-comment-dots"></i></i></a>
                      <span>848k</span>
                    </li>
                    <li class="item-utilities">
                      <a href="#!"><i class="fa-solid fa-bookmark"></i></a>
                      <span>777k</span>
                    </li>
                    <li class="item-utilities">
                      <a href="#!"><i class="fa-solid fa-share"></i></a>
                      <span>252k</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
        `
        )
        .join("")}
        `;

    console.log(this.query._page);
    this.rootEl.append(div);
    this.query._page++;
  },

  getPosts: async function (query = {}) {
    animationLoader.classList.add("active");
    isDrag = true; //chặn thanh cuộn khi load dữ liệu.

    let queryString = new URLSearchParams(query).toString();

    queryString = queryString ? "?" + queryString : "";

    const { data: posts } = await client.get(`/posts${queryString}`);
    // console.log(posts.length);
    if (posts.length === 0) {
      animationLoader.classList.remove("active");
      return;
    }
    this.render(posts);
  },

  start: function () {
    this.getPosts(this.query);
  },
};

//chạy app
app.start();

window.addEventListener("scroll", () => {
  if (isDrag) {
    return;
  }

  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight * 0.95
  ) {
    app.start();
  }
  // console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);
});

//
//scrollEvent.
const backToTop = document.createElement("div");
backToTop.innerHTML = `<i class="fa-solid fa-forward-step"></i>`;
document.body.appendChild(backToTop);

window.addEventListener("scroll", (e) => {
  var scrolly = window.scrollY;

  if (scrolly > window.innerHeight) {
    backToTop.classList.add("back-to-top");
  } else {
    backToTop.classList.remove("back-to-top");
  }
});

backToTop.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});
