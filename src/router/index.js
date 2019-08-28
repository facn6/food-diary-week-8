const express = require("express");

const queries = require("../model/queries/queries.js");

const router = express.Router();

// const app = express();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/logmeal", (req, res, next) => {
  queries
    .getMealTitles()
    // .then(console.log)
    .then(result => result.rows)
    .then(getMealTitles => res.render("logmeal", { getMealTitles }))
    // .then(console.log)
    .catch(err => next(err));
});

router.post("/logmeal", (req, res) => {
  console.log("Log Meal ", req);
  // console.log("Log Meal body: ", req.body);
  //   .addFacster(body)
  //   .then(userID => queries.getFacsterById(userID))
  //   .then(user => res.status(201).json(user))
  // .catch(err => next(err));
});

router.get("/submit", (req, res) => {
  res.render("meal-submission");
});

router.post("/submit", (req, res, next) => {
  queries.addMeal(req).catch(err => next(err));
});

module.exports = router;
