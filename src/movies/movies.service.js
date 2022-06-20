
const knex = require("../db/connection");

const list = () => {
  return knex("movies").select("*");
}


const read = (movieId) => {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first();
}


const moviesInTheaters = () => {
  return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .distinct("mt.movie_id");
}

const getTheaters = (movieId) => {
  return knex("movies as m")
  .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
  .join("theaters as t", "t.theater_id", "mt.theater_id")
  .select("t.*","mt.movie_id","mt.is_showing")
  .where({ "m.movie_id": movieId })

}

const getCritic = (criticId) => {
  return knex("critics")
  .select("*")
  .where({"critic_id": criticId})
}

const getMovieReviews = (movieId) => {
  return knex("reviews as r")
  .join("critics as c", "r.critic_id", "c.critic_id" )
  .select("r.*")
  .where({ "r.movie_id":movieId })
}


module.exports = {
  list,
  read,
  moviesInTheaters,
  getMovieReviews,
  getCritic,
  getTheaters,
  
}