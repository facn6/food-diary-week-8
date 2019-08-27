const db = require("./../database/dbConnection");

const getMealTitles = () => db.query(`SELECT title FROM meals`);
console.log("Data from database", getMealTitles());

module.exports = getMealTitles;
