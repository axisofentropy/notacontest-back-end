const db = require("../dbConfig.js");

module.exports = {
  get: function(id) {
    let query = db("students");
    if (id) {
      query.where("id", Number(id)).first();
    }
    return query;
  },

  getScores: function(id) {
    return db("scores as sc")
      .join("students as s", "s.id", "sc.studentId")
      .select("sc.id", "sc.task", "sc.points", "sc.date")
      .where("sc.studentId", id);
  },

  getTotal: function(id) {
    let scores = db("scores as sc")
      .join("students as s", "s.id", "sc.studentId")
      .select("sc.points")
      .where("sc.studentId", id);
    const total = scores.map(x => x.points).reduce((t, a) => t + a);
    return total;
  },

  insert: function(student) {
    return db("students")
      .insert(student)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, student) {
    return db("students")
      .where("id", id)
      .update(student);
  },
  remove: function(id) {
    return db("students")
      .where("id", id)
      .del();
  }
};
