const {
  fetchReviewById,
  changeReviewVotes,
  fetchReviews,
  fetchReviewComments,
  publishCommentOnReview,
} = require('../models/reviews.model.js');

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;

  changeReviewVotes(review_id, inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  fetchReviews(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

exports.getReviewComments = (req, res, next) => {
  const { review_id } = req.params;

  fetchReviewComments(review_id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.postCommentOnReview = (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;

  publishCommentOnReview(review_id, username, body)
    .then((newComment) => {
      res.status(201).send({ newComment });
    })
    .catch(next);
};
