const express = require('express');

const queries = require('../model/queries/queries');

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

router.get('/submit', (req, res) => {
  res.render('meal-submission');
});

router.post('/submit', ({ body }, res, next) => {
  queries
    .addMeal(body)
    .then(res.render('home'))
    .catch((err) => next(err));
});

router.get('/alllogs', (req, res, next) => {
  queries
    .getAllUserLogs()
    .then((logs) => res.status(200).json(logs))
    .catch((err) => next(err));
});

module.exports = router;
