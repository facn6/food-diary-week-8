const connection = require("../database/dbConnection");

const getMealTitles = () => connection.query(`SELECT title, id FROM meals`);

const logMeal = body => {
  const { username, meal, date, time, portion } = body;
  const id_meal = parseInt(meal, 10);
  const datetime = `${date} ${time}`;
  return connection.query(
    `INSERT INTO meal_log(username, meal_id, datetime, portion_size )
     VALUES($1, $2, $3, $4)`,
    [username, id_meal, datetime, portion]
  );
  // .then(idArray => {
  //   return idArray[0];
  // });
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

// const getAllUserLogs = (user, cb) => {
//   connection.query(
//     "SELECT * FROM meal_log WHERE username = $1;",
//     [user],
//     (err, res) => {
//       if (err) {
//         cb(err);
//       } else {
//         cb(null, res.rows);
//       }
//     }
//   );
// };

const getAllUserLogs = () => connection.query(`SELECT * FROM meal_log`);

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
  logMeal,
  addMeal,
  getMealTitles,
  getAllLogs,
  getAllUserLogs,
  getSingleLog,
  getAllMeals,
  getMealById
};
