const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const bodyParser = require("body-parser");
const routes = require("./router/index");

const helpers = require("./views/helpers/index");

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    defaultLayout: "main"
  })
);

app.set("port", process.env.PORT || 3000);
app.use(routes);
module.exports = app;
