exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { id: 1, name: "Nick" },
        { id: 2, name: "Larry" },
        { id: 3, name: "Joel" },
        { id: 4, name: "Skyelar" },
        { id: 5, name: "Xander" },
        { id: 6, name: "Corey" }
      ]);
    });
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("scores")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("scores").insert([
        {
          id: 1,
          task: "Pop Quiz",
          points: 3,
          date: 1550471565370,
          studentId: 1
        },
        {
          id: 2,
          task: "Pop Quiz",
          points: 3,
          date: 1550471565370,
          studentId: 2
        },
        {
          id: 3,
          task: "Stretch",
          points: 3,
          date: 1550477952667,
          studentId: 4
        }
      ]);
    });
};
