const db = require("../dbConfig.js");

module.exports = {
  find,
  insert,
  update,
  remove,
  findByStudent
};

function find(id) {
  if (id) {
    return db("scores")
      .where({ id: Number(id) })
      .first();
  } else {
    return db("scores");
  }
}

function findByStudent(studentId) {
  return db("scores").where({ studentId: Number(studentId) });
}

function insert(score) {
  return db("scores")
    .insert(score)
    .then(ids => ({ id: ids[0] }));
}

function update(id, score) {
  return db("scores")
    .where("id", Number(id))
    .update(score);
}

function remove(id) {
  return db("scores")
    .where("id", Number(id))
    .del();
}
