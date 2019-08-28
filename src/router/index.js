const express = require("express");

// const { getMealTitles } = require("../model/queries/queries.js");

// const queries = require("./queries");

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

// app.post("/fruit", (req, res) => {
//   console.log(req.body);
//   console.log(req.body.name, req.body.image_url);
// });

// router.get("/facsters", (req, res, next) =>
//   queries
//     .getAll()
//     .then(users => res.status(200).json(users))
//     .catch(err => next(err))
// );

router.get("/submit", (req, res) => {
  res.render("meal-submission");
});

router.post("/submit", ({ body }, res, next) => {
  queries.addMeal(body).catch(err => next(err));
});

module.exports = router;
