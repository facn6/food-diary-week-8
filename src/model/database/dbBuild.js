const fs = require("fs");
const connection = require("./dbConnection");
const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const buildDatabase = cb => {
  connection.query(sql, cb);
};

buildDatabase();

module.exports = buildDatabase;