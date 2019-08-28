// const fs = require("fs");
const {
  QueryFile,
} = require('pg-promise');
const path = require('path');
const connection = require('./dbConnection');

const sql = (file) => new QueryFile(path.join(__dirname, file), {
  minify: true,
});

const build = sql('./db_build.sql');

connection.query(build)
  .then((res) => console.log('res', res))
  .catch((e) => console.error('error', e));

module.exports = {
  build,
  connection,
};
