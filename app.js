const express = require("express");
var expressLayouts = require('express-ejs-layouts');
const { default: mongoose } = require("mongoose");
const { AllRouters } = require("./routes/index.routes");

const app = express();
mongoose
  .connect("mongodb://localhost:27017/passport-js", {})
  .then(() => console.log("connected to mongodb"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layout/main.ejs');

app.use(AllRouters);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
