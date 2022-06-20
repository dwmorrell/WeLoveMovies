
const services = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


const movieExists = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await services.read(movieId); 
  if (movie) {
    res.locals.movie = movie;
    return next();
  } 
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}


const read = (req, res) => {
  res.json({ data: res.locals.movie });
}

const list = async (req, res) => {
  const { is_showing } = req.query;

  if(is_showing) {
    res.status(200).json({ data: await services.moviesInTheaters()})
  } else {
    res.status(200).json({ data: await services.list()})
  }
}

const getTheaters = async (req, res) => {
  const { movieId } = req.params
  const result = await services.getTheaters(movieId)
  
  res.json({ data:result })
}

const getReviews = async (req, res) => {
  const { movieId } = req.params
  const reviews = await services.getMovieReviews(movieId);
  const allReviews = [];
  for(let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const critic = await services.getCritic(review.critic_id);
    review.critic = critic[0]
    allReviews.push(review)
    
  }

  res.status(200).json({data: allReviews})
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  getTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getTheaters)],
  getReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getReviews)]
};