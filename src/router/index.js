const express = require("express");

const queries = require("../model/queries/queries.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/logmeal", (req, res, next) => {
  queries
    .getMealTitles()
    .then(getMealTitles => res.render("logmeal", { getMealTitles }))
    .catch(err => next(err));
});

router.post("/logmeal", ({ body }, res, next) => {
  const { username } = body;
  queries
    .logMeal(body)
    .then(res.redirect(`/logs/${username}`))
    .catch(err => next(err));
});

router.get("/logs/:username", (req, res, next) => {
  const name = req.params.username;
  queries
    .getAllUserLogs(name)
    .then(userLogs => res.render("logs", { userLogs }))
    .catch(err => next(err));
});

router.get(
  "/logs/mealdetails/:title/:calories/:ingredients/:portion_size",
  (req, res) => {
    console.log("Request params:", req.params);
    const { title, calories, ingredients, portion_size } = req.params;
    const totalCal = calories * portion_size;
    res.render("onemealinfo", {
      title,
      calories,
      ingredients,
      portion_size,
      totalCal
    });
  }
);

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
