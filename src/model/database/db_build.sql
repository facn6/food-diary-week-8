BEGIN;

DROP TABLE IF EXISTS meals, meal_log CASCADE;

CREATE TABLE meals (
  id          SERIAL        PRIMARY KEY,
  title       VARCHAR(40)   NOT NULL,
  calories    integer       NOT NULL,
  ingredients text ARRAY    NOT NULL
);

CREATE TABLE meal_log (
  id            SERIAL        PRIMARY KEY,
  username      VARCHAR(40)   NOT NULL,
  meal_id       integer       REFERENCES meals(id),
  datetime      TIMESTAMP WITHOUT TIME ZONE   NOT NULL,
  portion_size  FLOAT
);

INSERT INTO meals (title, calories, ingredients) VALUES
('Chicken Salad', 400, '{"Chicken", "Avocado", "Lettuce", "Onion"}'),
('Tuna Pasta', 600, '{"Tuna", "Pasta", "Tomato", "Garlic"}'),
('Falafel Wrap', 500, '{"Falafel", "Houmous", "Pitta", "Cabbage", "Onion", "Gherkin"}'),
('Coco-Pops', 420, '{"Bread", "Butter", "Philidelphia"}'),
('Mango', 200, '{"Mango"}'),
('Dhaal', 350, '{"Red Lentils", "Curry Powder", "Onion", "Tomato"}');

INSERT INTO meal_log (username, meal_id, datetime, portion_size) VALUES
('Bobby', 5, '2019-08-26  20:05:06', 7),
('Ayah', 1, '2019-08-27  13:05:06', 1),
('Kira', 4, '2019-08-24  08:05:06', 1),
('Kira', 3, '2019-08-24  12:05:06', 1),
('Kira', 2, '2019-08-24  18:05:06', 1);

COMMIT;