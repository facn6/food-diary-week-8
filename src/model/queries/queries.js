const connection = require('../database/dbConnection');

const getMealTitles = () => connection.query('SELECT title FROM meals');

const logMeal = (body) => {
  const {
    username,
    date,
    title,
  } = body;
  return connection.query(
    'INSERT INTO meal_log(firstname, surname, cohort) VALUES($1,$2, $3) RETURNING ID',
    [username, date, title],
  )
    .then((idArray) => idArray[0]);
};

const getAllLogs = () => connection.query('SELECT * FROM meal_log;');

const getAllUserLogs = (user) => connection.query('SELECT * FROM meal_log WHERE username = $1;', [user]);

const getSingleLog = (logId) => connection.query('SELECT * FROM meal_log WHERE id = $1;', [logId]);

const getAllMeals = (cb) => connection.query('SELECT * FROM meals;');

const getMealById = (mealId) => connection.query('SELECT * FROM meals WHERE id = $1;', [mealId]);

const addMeal = (meal) => {
  const {
    title,
    calories,
    ing,
  } = meal;
  return connection.query(
    'INSERT INTO meals(title, calories, ingredients) VALUES($1, $2, $3) ',
    [title, calories, ing],
  );
};

module.exports = {
  addMeal,
  getMealTitles,
  getAllLogs,
  getAllUserLogs,
  getSingleLog,
  getAllMeals,
  getMealById,
  logMeal,
};
