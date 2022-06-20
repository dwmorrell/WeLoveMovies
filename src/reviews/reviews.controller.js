const services = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


const reviewExists = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await services.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    return next({
        status: 404,
        message: `Review with id ${reviewId} cannot be found!`
    });
}

const update = async (req, res, next) => {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
    };
    const data = await services.update(updatedReview);
    const critic = await services.readCritic(res.locals.review.review_id)
    const time = Date.now().toString()
    res.json({ data: { 
            ...data,
            created_at: time,
            critic: critic,
            updated_at: time,
         } });

    
}


const destroy = async (req, res) => {
   await services.delete(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}