import { client } from "./client.js";
import { config } from "./config.js";
import {
  htmlHome,
  htmlLayout,
  htmlFormLogin,
  htmlFormRegister,
  htmlUser,
  toastMy,
} from "./html.js";
const { SERVER_API_AUTH } = config;
const { PAGE_LIMIT } = config;

client.setUrl(SERVER_API_AUTH);
console.log(client.serverApi);

let currentPage = 1;

//Giao diện thông báo.
const main = document.createElement("div");
main.classList.add("list-toast");
document.body.prepend(main);

const app = {
  rootEl: document.querySelector("#root"),
  query: {
    // _sort: "id",
    _order: "desc", //Sắp xếp desc_mới nhất, asc_cũ nhất
    _limit: PAGE_LIMIT, //Giới hạn số lượng bài viết.
    _page: currentPage,
  },

  isLogin: function () {
    const status = localStorage.getItem("userData") ? true : false;
    return status;
  },

  render: function () {
    let html;

    if (this.isLogin()) {
      html = htmlUser;
      //Lấy thông tin user, render ra giao diện
      this.getProfile();
    } else {
      html = htmlHome;
    }

    this.rootEl.innerHTML = html;
    //render danh sách các bài post
    this.renderListPost(this.query);
  },

  //xây dựng hiệu ứng loading.
  loading: function () {
    const loadingEl = document.createElement("div");
    loadingEl.classList.add("loading_container");
    loadingEl.innerHTML = `
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `;
    document.body.prepend(loadingEl);
  },

  //hành động loading.
  handleLoading: function (check = true) {
    const loadEl = document.querySelector(".loading_container");

    if (check) {
      loadEl.classList.add("active");
    } else {
      loadEl.classList.remove("active");
    }
  },

  //hành động đăng nhập.
  handleLoginFromHome: function () {
    const btnLogin = this.rootEl.querySelector(".btn-login");
    if (btnLogin === null) {
      return;
    }

    btnLogin.addEventListener("click", (e) => {
      this.rootEl.innerHTML = htmlLayout;
      const formContainer = this.rootEl.querySelector(".form-container");
      formContainer.innerHTML = htmlFormLogin;
      this.renderFormLoginOrRegister(formContainer);
    });
  },

  //giao diện đăng nhập và đăng ký.
  renderFormLoginOrRegister: function (formContainer) {
    if (formContainer === undefined) {
      return;
    }

    const linklogin = formContainer.querySelector(".js-link");
    const btnMore = this.rootEl.querySelector(".js-btnHome");

    //render trang chủ.
    btnMore.addEventListener("click", () => {
      console.log("Về trang chủ");
      this.render();
      this.handleLoginFromHome();
    });

    linklogin.addEventListener("click", (e) => {
      e.preventDefault();

      if (linklogin.classList.contains("link-register")) {
        formContainer.innerHTML = htmlFormRegister;
        const linkLogin = document.querySelector(".link-login");
        linkLogin.addEventListener("click", () => {
          formContainer.innerHTML = htmlFormLogin;
        });
      }
      if (linklogin.classList.contains("link-login")) {
        formContainer.innerHTML = htmlFormLogin;
        const linkRes = document.querySelector(".link-register");
        console.log(linkRes);
        linkRes.addEventListener("click", () => {
          formContainer.innerHTML = htmlFormRegister;
        });
      }
    });
  },

  //Lấy dữ liệu khi submit form đăng ký, đăng nhập.
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

  register: async function (data) {
    this.handleLoading();
    try {
      const { response, data: token } = await client.post(
        "/auth/register",
        data
      );
      this.handleLoading(false);

      if (!response.ok) {
        if (token.message.includes("tồn tại")) {
          throw new Error("Tài khoản đã tồn tại");
        }
        throw new Error("Tạo tài khoản thất bại");
      }

      toastMy({
        title: "Tạo tài khoản thành công",
        msg: "Vui lòng đợi 1 giây",
        type: "success",
      });

      //Chuyển sang form đăng nhập khi đăng ký thành công.
      const formContainer = this.rootEl.querySelector(".form-container");
      setTimeout(() => {
        formContainer.innerHTML = htmlFormLogin;
      }, 1000);
    } catch (e) {
      toastMy({
        title: e,
        msg: "vui lòng thực hiện lại",
        type: "error",
      });
      this.handleLoading(false);
    }
  },

  login: async function (data) {
    this.handleLoading();
    try {
      const { response, data: token } = await client.post("/auth/login", data);
      this.handleLoading(false);

      //Khi xảy ra lỗi
      if (!response.ok) {
        throw new Error("Email hoặc mật khẩu không hợp lệ");
      }

      //Thêm token vào Storage (localStorage)
      localStorage.setItem("userData", JSON.stringify(token.data));
      //Render
      this.render();
      toastMy({
        title: "Đăng nhập thành công",
        msg: "...",
        type: "info",
      });
    } catch (e) {
      toastMy({
        title: "Đăng nhập thất bại",
        msg: `${e.message}}`,
        type: "error",
      });
    }
  },

  //Lấy thông tin user
  getProfile: async function () {
    try {
      let token = JSON.parse(localStorage.getItem("userData"));
      let accessToken;

      if (token) {
        accessToken = token["accessToken"];
      }

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
        this.handlePostBlogs(formPosts);
      });

      //Đăng suất
      const logoutEl = this.rootEl.querySelector(".logout");

      logoutEl.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("click logout");
        this.logout();
      });
    } catch (e) {
      this.logout();
    }
  },

  handlePostBlogs: async function (formPosts) {
    this.handleLoading();
    const titlePost = formPosts.querySelector(".titlePost");
    const contentPost = formPosts.querySelector(".contentPost");
    const timePost = formPosts.querySelector("#timePost");
    const title = titlePost.value;
    const content = contentPost.value;
    const timeValue = timePost.value;

    if (!title || !content) {
      console.log("vui lòng nhập đầy đủ thông tin");
      toastMy({
        title: "thông tin không hợp lệ",
        msg: "Vui lòng nhập đầy đủ thông tin",
        type: "warning",
      });
      this.handleLoading(false);
      return;
    }

    if (timeValue) {
      this.handlDelayDatePost(
        title,
        content,
        timeValue,
        titlePost,
        contentPost,
        timePost
      );
      this.handleLoading(false);
      return;
    }

    const { response: res, data } = await client.post("/blogs", {
      title,
      content,
    });

    if (!res.ok) {
      this.handleRefreshToken().then(async () => {
        await client.post("/blogs", {
          title,
          content,
        });
      });
    }
    //Render lại giao diện
    this.renderListPost(this.query);
    this.handleLoading(false);
    console.log("đăng bài hoàn thành");
    toastMy({
      title: "Đăng bài thành công",
      msg: "...",
      type: "success",
    });
    titlePost.value = "";
    contentPost.value = "";
    timePost.value = "";
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
      this.logout();
    }
  },

  handlDelayDatePost: function (
    title,
    content,
    delayDate,
    titlePost,
    contentPost,
    timePost
  ) {
    const currTimes = new Date();
    const time = new Date(delayDate);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const date = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const text = `Bài viết được đăg vào lúc ${hours}:${minutes} ngày ${date} tháng ${month} năm ${year}`;
    console.log(title, content);

    if (time - currTimes > 0 && year < 9999) {
      toastMy({
        title: `${text}`,
        msg: "",
        type: "success",
      });
      titlePost.value = "";
      contentPost.value = "";
      timePost.value = "";
    } else {
      toastMy({
        title: `Thời gian không hợp lệ`,
        msg: "Vui lòng chọn lại thời gian đăng bài",
        type: "warning",
      });
    }
  },

  getDate: function (date) {
    const currTime = new Date();
    const khoangTs = Math.floor((currTime.getTime() - date) / 1000); //s
    const phut = Math.floor(khoangTs / 60);
    const gio = Math.floor(khoangTs / 60 / 60);
    const ngay = Math.floor(khoangTs / 60 / 60 / 24);
    const tuan = Math.floor(khoangTs / 60 / 60 / 24 / 7);
    const thang = Math.floor(tuan / 4);

    let text;
    if (khoangTs < 60) {
      text = `${khoangTs} giây`;
    } else if (60 <= khoangTs && khoangTs < 3600) {
      text = `${phut} phút`;
    } else if (khoangTs >= 3600 && khoangTs < 86400) {
      text = `${gio} giờ`;
    } else if (gio > 24 && gio < 168) {
      text = `${ngay} ngày`;
    } else if (ngay > 7) {
      text = `${tuan} tuần`;
    }
    // console.log(text);
    return `${text} trước`;
  },

  renderListPost: async function (query = {}) {
    const listBlogEl = this.rootEl.querySelector(".list-blog");
    let queryString = new URLSearchParams(query).toString();
    queryString = queryString ? "?" + queryString : "";
    let arrPost = [];

    const { data } = await client.get(`/blogs${queryString}`);
    arrPost = [...data.data];

    //Biểu thức để nhận biết 1 thẻ HTML__xử lý XSS.
    const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");

    listBlogEl.innerHTML = `
      ${arrPost
        .map((item) => {
          const dates = new Date(item.timeUp);
          const timePost = `${dates.getHours()}:${dates.getMinutes()} | ${dates.getDate()}-${
            dates.getMonth() + 1
          }-${dates.getFullYear()}`;

          return `
            <div class="card-blog">
              <div class="card-blog-user">
                <div class="avata-user"></div>
                <div class="info-user">
                  <h3 class="name-user">${stripHtml(item.userId.name)}</h3>
                  <p>${this.getDate(dates)}</p>
                </div>
              </div>
              <div class="card-blog-title">${stripHtml(item.title)}</div>
              <p class="card-blog-content">${stripHtml(item.content)}</p>
              <span class="timePost">${timePost}</span>
            </div>
          `;
        })
        .join("")}    
    `;
  },

  logout: async function () {
    this.handleLoading();
    await client.post("/auth/logout");
    localStorage.removeItem("userData");

    this.render();
    this.handleLoading(false);
    toastMy({
      title: "Đăng xuất thành công",
      msg: "...",
      type: "success",
    });
    this.handleLoginFromHome();
  },

  start: function () {
    this.loading();
    this.handleLoading();
    this.render();
    this.renderFormLoginOrRegister();
    this.handleLoginFromHome();
    this.addEvent();
  },
};

app.start();
window.onload = () => {
  app.handleLoading(false);
};
