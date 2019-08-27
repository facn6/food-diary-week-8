const express = require("express");
const { Router } = express; //Here we destructure (ES6) the Router value off of express
const router = Router();
const queries = require("./queries");

// router.post("/facster/new", ({ body }, res, next) => {
//   queries
//     .addFacster(body)
//     .then(userID => queries.getFacsterById(userID))
//     .then(user => res.status(201).json(user))
//     .catch(err => next(err));
// });
// const express = require("express");
// const queries = require("../model/queries/queries");
//
// const router = express.Router();
//
// // router.post("/submitmeal", ({ body }, res, next) => {
// //   queries.addMeal(body).catch(err => next(err));
// // });
//
// module.exports = router;
