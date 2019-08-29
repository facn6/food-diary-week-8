const tape = require("tape");
const _test = require("tape-promise").default;

const test = _test(tape);
const { build, connection } = require("../model/database/dbBuild");
const queries = require("../model/queries/queries");

test("tape test for db files is working", t => {
  t.equal(1, 1, "1 equals 1");
  t.end();
});

const log1 = {
  id: 1,
  username: "Bobby",
  meal_id: 5,
  datetime: "2019-08-26 20:05:06",
  portion_size: 7
};

const newMealLog = {
  username: "Test",
  meal: "2",
  date: "2019-08-28",
  time: "20:05:06",
  portion: 1
};

const meal1 = {
  id: 1,
  title: "Chicken Salad",
  calories: 400,
  ingredients: ["Chicken", "Avocado", "Lettuce", "Onion"]
};

test("Test that getAllLogs returns all the diary info", t => {
  queries
    .getAllLogs()
    .then(result => {
      t.deepEqual(
        result[0].username,
        log1.username,
        "returns the correct info from DB"
      );
      t.end();
    })
    .catch(error => {
      if (error) console.log("we have an error with the query: ", error);
    });
});

test("Test that getAllUserLogs returns all the diary info for given user", t => {
  queries
    .getAllUserLogs("Bobby")
    .then(result => {
      t.deepEqual(
        result[0].username,
        log1.username,
        "returns the correct info from DB"
      );
      t.end();
    })
    .catch(error => {
      if (error) console.log("we have an error with the query: ", error);
    });
});

test("Test that getSingleLog returns the correct meal log", t => {
  queries
    .getSingleLog(1)
    .then(result => {
      t.deepEqual(
        result[0].username,
        log1.username,
        "returns the correct info from DB"
      );
      t.end();
    })
    .catch(error => {
      if (error) console.log("we have an error with the query: ", error);
    });
});

test("Test that getMeals returns all the meals in the database", t => {
  queries
    .getAllMeals()
    .then(result => {
      t.deepEqual(
        result[0].title,
        meal1.title,
        "returns the correct info from DB"
      );
      t.end();
    })
    .catch(error => {
      if (error) console.log("we have an error with the query: ", error);
    });
});

test("Test that getMealById returns all info in a meal", t => {
  queries
    .getMealById(1)
    .then(result => {
      t.deepEqual(result[0], meal1, "returns the correct info from DB");
      t.end();
    })
    .catch(error => {
      if (error) console.log("we have an error with the query: ", error);
    });
});

test("Test that getMealTitles returns all titles and ids", t => {
  queries
    .getMealTitles(1)
    .then(result => {
      t.deepEqual(
        result[0].id,
        meal1.id,
        "returns the correct meal id info from DB"
      );
      t.deepEqual(
        result[0].title,
        meal1.title,
        "returns the correct meal title info from DB"
      );
      t.end();
    })
    .catch(error => {
      if (error) console.log("we have an error with the query: ", error);
    });
});

test("Test that logMeal posts a new meal to DB", t => {
  queries
    .logMeal(newMealLog)
    .then(() => queries.getAllUserLogs("Test"))
    .then(result => {
      t.deepEqual(
        result[0].username,
        newMealLog.username,
        "loads new meal log into db"
      );
      t.end();
    })
    .catch(error => {
      if (error) console.log("we have an error with the query: ", error);
    });
});

test("That addMeal adds to the database", t => {
  queries
    .addMeal({
      title: "salad",
      calories: 200,
      ing: ["tomatoes", "cucumber", "", "", "", ""]
    })
    .then(({ id }) => queries.getMealById(id))
    .then(meal => {
      t.deepEqual(meal[0].title, "salad", "adds meal to database");
      t.end();
    });
});

connection
  .query(build)
  .then(() => console.log("Database connected and built"))
  .catch(e => console.error("error", e));
