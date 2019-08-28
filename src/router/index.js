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

router.post("/logmeal", ({ body }, res) => {
  console.log("Log Meal ", body);
  queries.logMeal(body);
  const { meal } = body;
  const id = parseInt(meal, 10);
  console.log(id);
  // .then(data => res.status(201).json(data))
  // .catch(err => next(err));
});

// .then(res.render("home"))

// router.post(
//   "/facsters/:name/:location",
//   ({ params: { name }, params: { location }, body }, res, next) => {
//     console.log("Name", name);
//     console.log("Location", location);
//     queries
//       .addLocation(name, location)
//       // .then(userID => queries.getFacsterById(userID))
//       // .then(console.log)
//       .then(user => res.status(201).json(user))
//       // .then("Then", console.log)
//
//       // .then(res.send("Hello Dexter"))
//       // .then("201", console.log)
//       .catch(err => next(err));
//   }
// );

router.get("/submit", (req, res) => {
  res.render("meal-submission");
});

router.post("/submit", ({ body }, res, next) => {
  queries.addMeal(body).catch(err => next(err));
});

router.get("/alllogs", (req, res, next) =>
  queries
    .getAllUserLogs()
    .then(logs => res.status(200).json(logs))
    .catch(err => next(err))
);

module.exports = router;
