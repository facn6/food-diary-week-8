const express = require("express");

// const data = require("./../model/queries");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
