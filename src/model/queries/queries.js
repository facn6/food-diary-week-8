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
};

const getAllLogs = () => connection.query("SELECT * FROM meal_log;");

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

const getAllUserLogs = user =>
  connection.query("SELECT * FROM meal_log WHERE username = $1;", [user]);

const getSingleLog = logId =>
  connection.query("SELECT * FROM meal_log WHERE id = $1;", [logId]);

const getAllMeals = cb => connection.query("SELECT * FROM meals;");

const getMealById = mealId =>
  connection.query("SELECT * FROM meals WHERE id = $1;", [mealId]);

const addMeal = meal => {
  const { title, calories, ing } = meal;
  return connection.query(
    `INSERT INTO meals(title, calories, ingredients) VALUES($1, $2, $3) `,
    [title, calories, ing]
  );
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
