const { eraseCommentById } = require('../models/comments.model');

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  eraseCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
