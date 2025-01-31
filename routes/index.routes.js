const { hashSync } = require("bcrypt");
const { userModel } = require("../model/user.model");
const { checkAuthentication, redirectIfIsAuth } = require("../middlware");

const authenticateConfig = { successRedirect: "/profile", failureRedirect: "/login", failureFlash: true};

const router = require("express").Router();

const initRoutes = (passport) => {
  router.get("/", (req, res) => {
    res.render("index", { title: "home" });
  });

  router.get("/register", redirectIfIsAuth, (req, res) => {
    res.render("register", { title: "register" });
  });

  router.get("/login", redirectIfIsAuth, (req, res) => {
    res.render("login", { title: "login" });
  });

  router.get("/profile", checkAuthentication, (req, res) => {
    const user = req.user;
    res.render("profile", { title: "profile", user });
  });

  router.get("/logout", checkAuthentication, (req, res) => {
    req.logOut({ keepSessionInfo: false }, (err) => {
      if (err) console.log(err);
    });
    res.redirect("/login");
  });

  router.post("/register", redirectIfIsAuth, async (req, res, next) => {
    try {
      const { fullname: fullName, username, password } = req.body;
      const hashPassword = hashSync(password, 10);
      const user = await userModel.findOne({ username });
      if (!!user) {
        const referrer = req?.header("Referrer") ?? req.headers.referer;
        req.flash("error", "this username already exist");
        return res.redirect(referrer ?? "/register");
      }
      await userModel.create({
        fullName: fullName,
        username: username,
        password: hashPassword,
      });
      res.redirect("/login");
    } catch (error) {
      next(error);
    }
  });

  router.post("/login", redirectIfIsAuth, passport.authenticate("local", authenticateConfig), (req, res, next) => {
      try {
        res.redirect("/profile");
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

module.exports = { initRoutes };
