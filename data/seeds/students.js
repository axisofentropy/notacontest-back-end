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
