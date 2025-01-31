const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const { default: mongoose } = require("mongoose");
const { initRoutes } = require("./routes/index.routes");
const flash = require("express-flash");
const session = require("express-session");
const { passportInit } = require("./passport.config");
const passport = require("passport");
const { notFound } = require("./notFound");
const { unexpectedError } = require("./unexpectedError");

const app = express();
mongoose
  .connect("mongodb://localhost:27017/passport-js", {})
  .then(() => console.log("connected to mongodb"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layout/main.ejs");
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(initRoutes(passport));
app.use(notFound);
app.use(unexpectedError);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
