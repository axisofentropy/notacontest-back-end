exports.up = function(knex) {
  return (
    createStudentsTable(knex)
      .then(createScoresTable)
      // .then(createTagsTable)
      // .then(createPostTagsTable)
      .catch(error => {
        console.log(error);
        reject(error);
      })
  );
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("scores")
    .then(function() {
      console.log("dropping students");
      return knex.schema.dropTableIfExists("students");
    })
    .catch(error => console.log(error));
};

function createStudentsTable(knex) {
  console.log("creating students table");

  return new Promise(function(resolve, reject) {
    knex.schema
      .createTable("students", function(students) {
        students.increments(); // id, integer, unsigned no sign as not negative numbers
        students
          .string("name", 128)
          .notNullable()
          .unique();

        console.log("students table created");
        resolve(knex);
      })
      .catch(error => reject(error));
  });
}

function createScoresTable(knex) {
  console.log("creating scores table");

  return new Promise(function(resolve, reject) {
    knex.schema
      .createTable("scores", function(scores) {
        scores.increments();
        scores.text("task").notNullable();
        scores.integer("points").notNullable();
        scores.bigint("date").notNullable(); // production ONLY
        // scores.integer("date").notNullable(); development ONLY

        scores
          .integer("studentId")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("students");

        console.log("scores table created");
        resolve(knex);
      })
      .catch(error => reject(error));
  });
}
