const express = require("express");

const { getMealTitles } = require("../model/queries/queries.js");
// const queries = require("../model/queries/queries.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/logmeal", (req, res) => {
  res.render("logmeal", {
    // title: "Countries",
    // username: "Kira",
    getMealTitles
  });
});

module.exports = router;
