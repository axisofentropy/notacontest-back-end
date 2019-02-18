const dbEnvironment = process.env.DB || "development";
const knex = require("knex");
const knexConfig = require("../knexfile");
module.exports = knex(knexConfig[dbEnvironment]);
