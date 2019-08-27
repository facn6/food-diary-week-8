const connection = require("../database/dbConnection");

const getAllLogs = (cb) => {
  connection.query("SELECT * FROM meal_log;", (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getAllUserLogs = (user, cb) => {
  connection.query('SELECT * FROM meal_log WHERE username = $1;', [user], (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getSingleLog = (logId, cb) => {
  connection.query('SELECT * FROM meal_log WHERE id = $1;', [logId], (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getAllMeals = (cb) => {
  connection.query('SELECT * FROM meals;', (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getMealById = (mealId, cb) => {
  connection.query('SELECT * FROM meals WHERE id = $1;', [mealId], (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};


module.exports = {
  getAllLogs,
  getAllUserLogs,
  getSingleLog,
  getAllMeals,
  getMealById
}