const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/submit", (req, res) => {
  res.render("meal-submission");
});

router.post("/submit", ({ body }, res, next) => {
  queries.addMeal(body).catch(err => next(err));
});

module.exports = router;
