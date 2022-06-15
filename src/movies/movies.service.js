
const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}


function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}


function moviesInTheaters() {
  return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .distinct("mt.movie_id");
}


module.exports = {
  list,
  read,
  moviesInTheaters,
  
}