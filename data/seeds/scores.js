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
          date: "2019-02-13T07:42:59.397Z",
          studentId: 1
        },
        {
          id: 2,
          task: "Pop Quiz",
          points: 3,
          date: "2019-02-13T07:42:59.397Z",
          studentId: 2
        },
        {
          id: 3,
          task: "Stretch",
          points: 3,
          date: "2019-02-13T07:42:59.397Z",
          studentId: 4
        }
      ]);
    });
};
