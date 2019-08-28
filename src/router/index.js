const express = require('express');

const queries = require('../model/queries/queries.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/logmeal', (req, res, next) => {
  queries
    .getMealTitles()
    .then((getMealTitles) => res.render('logmeal', { getMealTitles }))
    .catch((err) => next(err));
});

router.post('/logmeal', ({ body }, res) => {
  queries.logMeal(body);
  const { meal } = body;
  const id = parseInt(meal, 10);
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

router.get('/submit', (req, res) => {
  res.render('meal-submission');
});

router.post('/submit', ({ body }, res, next) => {
  queries
    .addMeal(body)
    .then(res.render('home'))
    .catch((err) => next(err));
});

router.get('/alllogs', (req, res, next) => queries
    .getAllUserLogs()
    .then((logs) => res.status(200).json(logs))
    .catch((err) => next(err)),);

module.exports = router;
