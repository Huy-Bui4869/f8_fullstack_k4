export const htmlLayout = `
<section>
<div class="container">
  <div class="just-log">
    <i class="fa-solid fa-arrow-right arrow"></i>
    <div class="sub-just-log">
      <div class="title">
        <h2><span class="logo-just-log">JL</span> Just Log</h2>
      </div>
      <p class="decs">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        elusmod tempor incididunt Lorem ípum
      </p>
      <button class="btn">Read More</button>
      <ul class="icon">
        <li class="item-icon">
          <a href="#!"><i class="fa-brands fa-facebook-f"></i></a>
        </li>
        <li class="item-icon">
          <a href="#!"><i class="fa-brands fa-twitter"></i></a>
        </li>
        <li class="item-icon">
          <a href="#!"><i class="fa-brands fa-google-plus-g"></i></a>
        </li>
        <li class="item-icon">
          <a href="#!"><i class="fa-brands fa-linkedin-in"></i></a>
        </li>
      </ul>
    </div>
  </div>

  <div class="form-container"></div>
</div>
</section>
`;

export const htmlFormRegister = `
    <form class="form form-register">
        <h2 class="title">Create <span>your account</span></h2>
        <input type="name" class="name" placeholder="Please enter the name" required/>
        <input type="email" class="email" placeholder="Please enter the email" required/>
        <input type="password" class="password" placeholder="Please enter the password" required/>
        <div class="showError"></div>
        <button class="btn btn-register">REGISTER</button>
        <div>
            <span>You like to return to the? </span>
            <a href="#!" class="js-link link-login>login page</a>
        </div>
    </form>
`;

// <a href="#!" class="js-link link-register">Register here</a>
export const htmlFormLogin = `
    <form class="form form-login">
        <h2 class="title-login">Login to <span>your account</span></h2>
        <input type="email" class="email" placeholder="Email Address" value="userName4869@edu.vn" required/>
        <input type="password" class="password" placeholder="Password" value="11111111Cc" required/>
        <div class="sub-login">
            <label for="remember">
                <input id="remember" type="checkbox" />
                <span>Remember be</span>
            </label>
            <a href="#!">Forgot Password</a>
        </div>
        <div class="showError"></div>
        <button class="btn btn-login">LOGIN</button>
        <div>
            <span>Don't have an account? </span>
            <a href="#!" class="js-link link-register">Register here</a>
        </div>
    </form>
`;

export const htmlUser = `
  <div class="container-user">
    <div class="user">
      <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
      <ul class="profile">
        <li>Chào bạn: <span class="name">Loading...</span></li>
        <li><a href="#" class="logout">Đăng xuất</a></li>
      </ul>
    </div>
    <form class="post">
      <div class="div_post">
        <label for="titlePost">Enter your title</label>
        <input
          type="text"
          name="titlePost"
          class="titlePost"
          placeholder="Please enter your title"
        />
      </div>
      <div class="div_post">
        <label for="contentPost">Enter your content</label>
        <textarea
          name="contentPost"
          class="contentPost"
          placeholder="Content here..."
          row="20"
          col="20"
        ></textarea>
      </div>
      <div class="div_post">
        <label for="timePost">Set time to post</label>
        <input type="text" name="timePost" />
      </div>
      <button type="submit">Write new!</button>
    </form>
  </div>
  <div class="list-blog"></div>
`;
