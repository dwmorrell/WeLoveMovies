const knex = require("../db/connection");

function list() {
    return knex("reviews").select("*");
}

function read(movieId) {
    return knex("reviews").select("*").where({ movie_id: movieId}).first();

}

function destroy(reviewId) {
    return knex("reviews")
    .where({ review_id: reviewId})
    .del();
}

function getCritics(criticId) {
    return knex("critics")
    .select("*")
    .where({ critic_id: criticId})
    .first();
}

function getMovieReviews(movieId) {
    return knex("reviews")
    .where({ movie_id: movieId })
    .then((reviews) => Promise.all(reviews.map(setCritic)));
}

async function setCritic(review) {
    review.critic = await readCritic(review.critic_id);
    return review;
  }

  function readCritic(criticId) {
    return knex("critics")
    .select("*")
    .where({ critic_id: criticId })
    .first();
  }