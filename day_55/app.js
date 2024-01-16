//1.1
require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//1.2
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const port = 3000;
const hostname = "localhost";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//- Cầu hình layout
app.use(expressEjsLayout);

//- Cấu hình session
app.use(
  session({
    name: "f8_sesion",
    secret: "422987eb04673643936027c2523543d1e2d987ccd4643b048192e8a8be9c77ae",
    resave: false,
    saveUninitialized: true,
  })
);

//Gọi sau phần session.
app.use(flash());

app.use(logger("dev"));

//- Cấu hình đọc dữ liệu ở body. repuest
//--> Đọc body ở dạng application/json
app.use(express.json());
//--> Đọc body ở dạng application/x-www-urlencoded
app.use(express.urlencoded({ extended: false }));

//- Cầu hình đọc cookie
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

//-  Routing
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(port, hostname, () => {
  //trả về trạng thái.
  console.log(`server running: http://${hostname}:${port}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
