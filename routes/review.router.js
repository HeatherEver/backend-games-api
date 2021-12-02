const reviewsRouter = require('express').Router();
const {
  getReviewById,
  updateReviewVotes,
  getReviews,
  getReviewComments,
  postCommentOnReview,
} = require('../controllers/reviews.controller.js');

reviewsRouter.route('/:review_id').get(getReviewById);
reviewsRouter.route('/:review_id').patch(updateReviewVotes);
reviewsRouter.route('/').get(getReviews);
reviewsRouter.route('/:review_id/comments').get(getReviewComments);
reviewsRouter.route('/:review_id/comments').post(postCommentOnReview);

module.exports = reviewsRouter;
