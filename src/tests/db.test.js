const test = require("tape");
const buildDatabase = require("../model/database/dbBuild");
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

test('Test that getAllLogs returns all the diary info', t => {
  buildDatabase((err, res) => {
    t.error(err, 'no errors whoop');
    queries.getAllLogs((error, result) => {
      if (error) console.log('we have an error with the query: ', error);
      t.deepEqual(result[0].username, log1.username, 'returns the correct info from DB');
      t.end();
    })
  })
})

test('Test that getAllUserLogs returns all the diary info for given user', t => {
  buildDatabase((err, res) => {
    t.error(err, 'no errors whoop');
    queries.getAllUserLogs('Bobby', (error, result) => {
      if (error) console.log('we have an error with the query: ', error);
      t.deepEqual(result[0].username, log1.username, 'returns the correct info from DB');
      t.end();
    })
  })
})

test('Test that getSingleLog returns the correct meal log', t => {
  buildDatabase((err, res) => {
    t.error(err, 'no errors whoop');
    queries.getSingleLog(1, (error, result) => {
      if (error) console.log('we have an error with the query: ', error);
      t.deepEqual(result[0].username, log1.username, 'returns the correct info from DB');
      t.end();
    })
  })
})

test('Test that getMeals returns all the meals in the database', t => {
  buildDatabase((err, res) => {
    t.error(err, 'no errors whoop');
    queries.getAllMeals((error, result) => {
      if (error) console.log('we have an error with the query: ', error);
      t.deepEqual(result[0].title, meal1.title, 'returns the correct info from DB');
      t.end();
    })
  })
})

test('Test that getMealById returns all info in a meal', t => {
  buildDatabase((err, res) => {
    t.error(err, 'no errors whoop');
    queries.getMealById(1, (error, result) => {
      if (error) console.log('we have an error with the query: ', error);
      t.deepEqual(result[0], meal1, 'returns the correct info from DB');
      t.end();
    })
  })
})