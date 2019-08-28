const connection = require("../database/dbConnection");

const getMealTitles = () => connection.query(`SELECT title FROM meals`);

const logMeal = body => {
  const { username, date, title } = body;
  return db
    .query(
      `INSERT INTO meal_log(firstname, surname, cohort) VALUES($1,$2, $3) RETURNING ID`,
      [username, date, title]
    )
    .then(idArray => {
      return idArray[0];
    });
};

const getAllLogs = cb => {
  connection.query("SELECT * FROM meal_log;", (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getAllUserLogs = (user, cb) => {
  connection.query(
    "SELECT * FROM meal_log WHERE username = $1;",
    [user],
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    }
  );
};

const getSingleLog = (logId, cb) => {
  connection.query(
    "SELECT * FROM meal_log WHERE id = $1;",
    [logId],
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    }
  );
};

const getAllMeals = cb => {
  connection.query("SELECT * FROM meals;", (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getMealById = (mealId, cb) => {
  connection.query(
    "SELECT * FROM meals WHERE id = $1;",
    [mealId],
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    }
  );
};

const addMeal = meal => {
  const { title, calories, ingredients } = meal;
  return db
    .query(
      `INSERT INTO meals(title, calories, ingredients) VALUES($1,$2, $3) RETURNING ID`,
      [title, calories, ingredients]
    )
    .then(idArray => idArray[0]);
};

module.exports = {
  addMeal,
  getMealTitles,
  getAllLogs,
  getAllUserLogs,
  getSingleLog,
  getAllMeals,
  getMealById
};
