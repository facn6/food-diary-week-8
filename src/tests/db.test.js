const tape = require("tape");
const _test = require('tape-promise').default;
const test = _test(tape);
const {
  build,
  connection
} = require("../model/database/dbBuild");
const queries = require("../model/queries/queries");

test("tape test for db files is working", t => {
  t.equal(1, 1, "1 equals 1");
  t.end();
});

const log1 = {
  id: 1,
  username: 'Bobby',
  meal_id: 5,
  datetime: '2019-08-26 20:05:06',
  portion_size: 7
}

const meal1 = {
  id: 1,
  title: 'Chicken Salad',
  calories: 400,
  ingredients: ['Chicken', 'Avocado', 'Lettuce', 'Onion']
}

connection.query(build)
  .then(res => console.log('res', res))
  .catch(e => console.error('error', e));

test('Test that getAllLogs returns all the diary info', t => {
  return queries.getAllLogs()
    .then(result => {
      t.deepEqual(result[0].username, log1.username, 'returns the correct info from DB');
      t.end();
    })
    .catch(error => {
      if (error) console.log('we have an error with the query: ', error);
    })
})

test('Test that getAllUserLogs returns all the diary info for given user', t => {
  return queries.getAllUserLogs('Bobby')
    .then(result => {
      t.deepEqual(result[0].username, log1.username, 'returns the correct info from DB');
      t.end();
    })
    .catch(error => {
      if (error) console.log('we have an error with the query: ', error);
    })
})

test('Test that getSingleLog returns the correct meal log', t => {
  return queries.getSingleLog(1)
    .then(result => {
      t.deepEqual(result[0].username, log1.username, 'returns the correct info from DB');
      t.end();
    })
    .catch(error => {
      if (error) console.log('we have an error with the query: ', error);
    })
})

test('Test that getMeals returns all the meals in the database', t => {
  return queries.getAllMeals()
    .then(result => {
      t.deepEqual(result[0].title, meal1.title, 'returns the correct info from DB');
      t.end();
    })
    .catch(error => {
      if (error) console.log('we have an error with the query: ', error);
    })
})

test('Test that getMealById returns all info in a meal', t => {
  queries.getMealById(1)
    .then(result => {
      t.deepEqual(result[0], meal1, 'returns the correct info from DB');
      t.end();
    })
    .catch(error => {
      if (error) console.log('we have an error with the query: ', error);
    })
})