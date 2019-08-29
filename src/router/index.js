const express = require("express");

const queries = require("../model/queries/queries.js");

const router = express.Router();

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/logmeal", (req, res, next) => {
  queries
    .getMealTitles()
    // .then(console.log)
    // .then(result => result)
    .then(getMealTitles => res.render("logmeal", { getMealTitles }))

    // .then(console.log)
    .catch(err => next(err));
});

router.post("/logmeal", ({ body }, res, next) => {
  const { username } = body;
  console.log("Log Meal ", body);
  queries
    .logMeal(body)
    // const { meal } = body;
    // const id = parseInt(meal, 10);
    // console.log(id);

    // console.log(username);

    // .then(result => result.rows)
    .then(res.redirect(`/logs/${username}`))
    .catch(err => next(err));
});

router.get(`/logs/:username`, (req, res, next) => {
  const name = req.params.username;
  console.log("Name from url", name);
  queries
    .getAllUserLogs(name)
    // .then(console.log)
    // .then(result => result)
    .then(userLogs => res.render("logs", { userLogs }))

    .catch(err => next(err));
});

router.get("/submit", (req, res) => {
  res.render("meal-submission");
});

router.post("/submit", ({ body }, res, next) => {
  queries
    .addMeal(body)
    .then(res.render("home"))
    .catch(err => next(err));
});

router.get("/alllogs", (req, res, next) =>
  queries
    .getAllLogs()
    .then(logs => res.status(200).json(logs))
    .catch(err => next(err))
);

module.exports = router;
