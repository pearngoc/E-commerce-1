const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const db = require("./config/db");
const passport = require("./passport");
const methodOverride = require("method-override");
const Handlebars = require("hbs");
const bodyParser = require("body-parser");

require("dotenv").config();

const indexRouter = require("./routes/index");
const aboutRouter = require("./routes/about");
const contactRouter = require("./routes/contact");
const blogRouter = require("./routes/blog/blog");
const cartRouter = require("./component/cart");
const productRouter = require("./component/products/index");
const authRouter = require("./component/authentication");
const loggedInUserGuard = require("./middleware/loggerInUserGuard");
const profileUserRouter = require("./component/user");
const commentRouter = require("./component/comment/index");
// connect to DB
db.connect();

const app = express();
app.use(methodOverride("_method"));

Handlebars.registerHelper("isdefined", function (value) {
  return value !== undefined;
});
Handlebars.registerHelper("multi", function (price, num) {
  return num * price;
});

Handlebars.registerHelper("switch", function (value, options) {
  this.switch_value = value;
  return options.fn(this);
});

Handlebars.registerHelper("case", function (value, options) {
  if (value == this.switch_value) {
    return options.fn(this);
  }
});
// view engine setup
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "component"),
]);
app.set("view engine", "hbs");

app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/utils", express.static(path.join(__dirname, "./utils")));

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  res.locals.session = req.session;
  next();
});

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);
app.use("/products", productRouter);
app.use("/me", loggedInUserGuard, profileUserRouter);
app.use("/blog", blogRouter);
app.use("/cart", cartRouter);
app.use("/comment", commentRouter);
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
