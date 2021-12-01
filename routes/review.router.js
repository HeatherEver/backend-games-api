const reviewsRouter = require("express").Router();
const {
  getReviewById,
  updateReviewVotes,
  getReviews,
} = require("../controllers/reviews.controller.js");

reviewsRouter.route("/:review_id").get(getReviewById);
reviewsRouter.route("/:review_id").patch(updateReviewVotes);
reviewsRouter.route("/").get(getReviews);

module.exports = reviewsRouter;
