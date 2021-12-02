const { query } = require('../db/connection');
const db = require('../db/connection');

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
        return Promise.reject({ status: 404, msg: 'Path not found' });
      }
      return rows;
    });
};

exports.changeReviewVotes = (review_id, inc_votes) => {
  if (inc_votes === undefined) {
    return Promise.reject({ status: 400, msg: 'Bad request :(' });
  }
  return db
    .query(
      `UPDATE reviews
        SET votes = votes + $1
        WHERE review_id = $2
        RETURNING *`,
      [inc_votes, review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Path not found' });
      }
      return rows[0];
    });
};

exports.fetchReviews = (sort_by = 'created_at', order = 'DESC', category) => {
  const columns = [
    'owner',
    'title',
    'category',
    'created_at',
    'votes',
    'comment_count',
  ];

  if (!columns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: 'invalid sort by query' });
  }

  if (!['ASC', 'asc', 'DESC', 'desc'].includes(order)) {
    return Promise.reject({ status: 400, msg: 'invalid order query' });
  }

  if (category) {
    return db
      .query(
        `SELECT 
      reviews.*, 
      CAST(COUNT(comments.review_id) AS int) AS comment_count
      FROM reviews 
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      WHERE reviews.category = $1
      GROUP BY reviews.review_id
      ORDER BY ${sort_by} ${order};`,
        [category]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: 'Path not found' });
        }
        return rows;
      });
  } else {
    return db
      .query(
        `SELECT 
      reviews.*, 
      CAST(COUNT(comments.review_id) AS int) AS comment_count
      FROM reviews 
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      GROUP BY reviews.review_id
      ORDER BY ${sort_by} ${order};`
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: 'Path not found' });
        }
        return rows;
      });
  }
};

exports.fetchReviewComments = (review_id) => {
  return db
    .query(
      `
  SELECT comments.*
  FROM comments
  LEFT JOIN users ON comments.author = users.username
  WHERE comments.review_id = $1;`,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Path not found' });
      }
      return rows;
    });
};

exports.publishCommentOnReview = (review_id, username, body) => {
  if (!username || !body) {
    return Promise.reject({ status: 400, msg: 'Bad request :(' });
  }

  return db
    .query(
      `INSERT INTO comments (author, body, review_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `,
      [username, body, review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Path not found' });
      }
      return rows;
    });
};
