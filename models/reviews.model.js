const db = require("../db/connection");

exports.fetchReviewById = (review_id) => {
  return db
    .query(
      `SELECT 
      reviews.*, 
      CAST(COUNT(comments.review_id) AS int) AS comment_count
      FROM reviews 
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id`,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Path not found" });
      }
      return rows;
    });
};
