import { client } from "./client.js";
import { config } from "./config.js";
import {
  htmlLayout,
  htmlFormLogin,
  htmlFormRegister,
  htmlUser,
} from "./html.js";
const { SERVER_API_AUTH } = config;
const { PAGE_LIMIT } = config;

client.setUrl(SERVER_API_AUTH);
console.log(client.serverApi);

let currentPage = 1;

const app = {
  rootEl: document.querySelector("#root"),
  query: {
    _sort: "id",
    _order: "desc", //Sắp xếp desc_mới nhất, asc_cũ nhất
    _limit: PAGE_LIMIT, //Giới hạn số lượng bài viết.
    _page: currentPage,
  },

  loading: function (hidden = true) {
    const loadingEl = document.createElement("div");
    loadingEl.classList.add("loading_container");
    loadingEl.innerHTML = `
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `;
    this.rootEl.append(loadingEl);
    console.log(hidden);

    if (hidden) {
      loadingEl.classList.add("active");
    } else {
      loadingEl.classList.remove("active");
    }
  },

  renderHome: function () {
    this.rootEl.innerHTML = "";
    const container = document.createElement("div");
    const btnLogin = document.createElement("button");
    btnLogin.innerText = "Đăng nhập";
    btnLogin.classList.add("btn-login");

    const listPosiEl = document.createElement("div");
    listPosiEl.classList.add("list-blog");
    container.append(btnLogin);

    this.rootEl.append(container);
    this.rootEl.append(listPosiEl);
    this.renderListPost(this.query);
  },

  //hành động đăng nhập.
  handleLoginFromHome: function () {
    const btnLogin = this.rootEl.querySelector(".btn-login");

    btnLogin.addEventListener("click", (e) => {
      //   console.log("click");
      this.rootEl.innerHTML = "";
      this.rootEl.innerHTML = htmlLayout;
      const formContainer = this.rootEl.querySelector(".form-container");
      formContainer.innerHTML = htmlFormLogin;
      this.renderFormLoginOrRegister();
    });
  },

  //giao diện đăng nhập và đăng ký.
  renderFormLoginOrRegister: function () {
    const linkReg = this.rootEl.querySelector(".js-link");

    linkReg.addEventListener("click", (e) => {
      e.preventDefault();
      const formContainer = this.rootEl.querySelector(".form-container");
      formContainer.innerHTML = "";

      if (e.target.classList.contains("link-register")) {
        formContainer.innerHTML = htmlFormRegister;
      } else if (e.target.classList.contains("link-login")) {
        formContainer.innerHTML = htmlFormLogin;
      }
    });
  },

  //Lấy dữ liệu khi submit form
  addEvent: function () {
    this.rootEl.addEventListener("submit", (e) => {
      e.preventDefault();

      if (e.target.classList.contains("form")) {
        const emailEl = e.target.querySelector(".email");
        const passwordEl = e.target.querySelector(".password");
        const email = emailEl.value;
        const password = passwordEl.value;

        if (e.target.classList.contains("form-register")) {
          const nameEl = e.target.querySelector(".name");
          const name = nameEl.value;

          this.register({ name, email, password });
        } else if (e.target.classList.contains("form-login")) {
          this.login({ email, password });
        }
      }
    });
  },

  showError: function (message) {
    const showError = this.rootEl.querySelector(".showError");

    //reset tránh khi còn những lỗi cũ.
    showError.innerText = "";
    showError.innerText = message;
  },

  register: async function (data) {
    console.log(data);
    this.loading();
    try {
      const { response, data: token } = await client.post(
        "/auth/register",
        data
      );
      this.loading(false);

      if (!response.ok) {
        if (token.message.includes("tồn tại")) {
          console.log("okokok");
          throw new Error("Tài khoản đã tồn tại");
        }
        throw new Error("Tạo tài khoản thất bại");
      }

      this.showError("Tạo tài khoản thành công");
    } catch (e) {
      this.showError(e.message);
    }
  },

  login: async function (data) {
    // console.log(data); //{email, password}
    this.loading();
    try {
      const { response, data: token } = await client.post("/auth/login", data);
      this.loading(false);

      //Khi xảy ra lỗi
      if (!response.ok) {
        throw new Error("Email hoặc mật khẩu không hợp lệ");
      }
      // console.log(token.data);

      //Thêm token vào Storage (localStorage)
      localStorage.setItem("userData", JSON.stringify(token.data));
      //Render
      this.rootEl.innerHTML = "";
      this.rootEl.innerHTML = htmlUser;
      this.renderListPost(this.query);
      this.getProfile();
    } catch (e) {
      this.showError(e);
    }
  },

  //Lấy thông tin user
  getProfile: async function () {
    try {
      const token = JSON.parse(localStorage.getItem("userData"));
      let accessToken;

      if (token) {
        accessToken = token["accessToken"];
      }
      console.log(`accessToken_bđ: ${accessToken}`);

      if (!accessToken) {
        throw new Error("accessToken not null");
      }

      client.setToken(accessToken);
      const { data } = await client.get("/users/profile");
      const user = data.data;

      const profileEl = this.rootEl.querySelector(".profile");
      const nameEl = profileEl.querySelector(".name");
      nameEl.innerText = user.name;

      //Đăng bài mới
      const formPosts = this.rootEl.querySelector(".container-user .post");

      formPosts.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("đăng bài");
        const titlePost = formPosts.querySelector(".titlePost");
        const contentPost = formPosts.querySelector(".contentPost");
        const titleValue = titlePost.value;
        const contentValue = contentPost.value;

        this.handlePostBlogs(titleValue, contentValue);
      });

      //Đăng suất
      const logoutEl = this.rootEl.querySelector(".logout");

      logoutEl.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("click logout");
        this.logout();
      });
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  },

  handlePostBlogs: async function (title, content) {
    const { response: res, data } = await client.post("/blogs", {
      title,
      content,
    });
    // console.log(res);
    console.log(data);

    if (!res.ok) {
      console.log("Không đăng bài được");
      this.handleRefreshToken().then(async () => {
        await client.post("/blogs", {
          title,
          content,
        });
        this.renderListPost(this.query);
      });
    }
    //Render lại giao diện
    this.renderListPost(this.query);
  },

  //Hàm cấp "accessToken" và "refreshToken" mới.
  handleRefreshToken: async function () {
    // console.log(`refreToken_bđ: ${JSON.parse(localStorage.getItem("userData")).refreshToken}`);
    const { response: refresh, data } = await client.post(
      "/auth/refresh-token",
      {
        refreshToken: JSON.parse(localStorage.getItem("userData"))[
          "refreshToken"
        ],
      }
    );

    if (refresh.ok) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      userData.accessToken = data.data.token.accessToken;
      userData.refreshToken = data.data.token.refreshToken;

      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("userData_mới", JSON.parse(localStorage.getItem("userData")));
      client.setToken(JSON.parse(localStorage.getItem("userData")).accessToken);
    } else {
      console.log("logout");
      this.logout();
    }
  },

  logout: async function () {
    const { response, data } = await client.post("/auth/logout");
    console.log(response);
    console.log(data);
    if (response.ok) {
    }
    localStorage.removeItem("userData");
    this.renderHome();
    this.handleLoginFromHome();
  },

  renderListPost: async function (query = {}) {
    const listBlogEl = this.rootEl.querySelector(".list-blog");
    let queryString = new URLSearchParams(query).toString();
    queryString = queryString ? "?" + queryString : "";
    let arrPost = [];

    const { data } = await client.get(`/blogs${queryString}`);
    arrPost = [...data.data];
    // console.log(arrPost);
    //Biểu thức để nhận biết 1 thẻ HTML__xử lý XSS.
    const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");

    listBlogEl.innerHTML = `
      ${arrPost
        .map((item) => {
          return `
          <div class="card-blog">
            <div class="card-blog-user">
              <div class="avata-user"></div>
              <h3 class="name-user">${stripHtml(item.userId.name)}</h3>
            </div>
            <div class="card-blog-title">${stripHtml(item.title)}</div>
            <p class="card-blog-content">${stripHtml(item.content)}</p>
          </div>
        `;
        })
        .join("")}    
    `;
  },

  start: function () {
    this.renderHome();
    this.handleLoginFromHome();
    this.addEvent();
    // this.submitFormPosts();
  },
};

app.start();
