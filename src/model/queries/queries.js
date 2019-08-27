const db = require("./../model/database/dbConnection.js");

const addMeal = meal => {
  const { title, calories, ingredients } = meal;
  return db
    .query(
      `INSERT INTO meals(title, calories, ingredients) VALUES($1,$2, $3) RETURNING ID`,
      [title, calories, ingredients]
    )
    .then(idArray => idArray[0]);
};
