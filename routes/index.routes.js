const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", { title: "home" });
});

module.exports = { AllRouters: router };
