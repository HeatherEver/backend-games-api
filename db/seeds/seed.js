const db = require("../connection.js");
const format = require("pg-format");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories`);
    })
    .then(() => {
      //CREATE TABLE categories
      return db.query(`
      CREATE TABLE categories(
        slug VARCHAR(100) UNIQUE NOT NULL PRIMARY KEY,
        description TEXT
      );
      `);
    })
    .then(() => {
      // CREATE TABLE users
      return db.query(`
      CREATE TABLE users (
        username VARCHAR(100) NOT NULL UNIQUE PRIMARY KEY,
        avatar_url TEXT,
        name VARCHAR(70) NOT NULL
      );`);
    })
    .then(() => {
      // CREATE TABLE reviews
      return db.query(`
      CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        review_body TEXT NOT NULL,
        designer VARCHAR NOT NULL,
        review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category VARCHAR REFERENCES categories (slug) ON DELETE CASCADE,
        owner VARCHAR(100) REFERENCES users (username) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`);
    })
    .then(() => {
      // CREATE TABLE comments
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR REFERENCES users (username) ON DELETE CASCADE,
        review_id INT REFERENCES reviews (review_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        body TEXT NOT NULL
      );
      `);
    })
    .then(() => {
      //INSERT DATA into categories
      const formattedCategoryData = categoryData.map((category) => {
        return [category.slug, category.description];
      });
      const queryStr = format(
        `
      INSERT INTO categories (
        slug, description
      ) VALUES
      %L
      RETURNING *;`,
        formattedCategoryData
      );
      return db.query(queryStr);
    })
    .then(() => {
      //INSERT DATA into users
      const formattedUserData = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const queryStr = format(
        `
      INSERT INTO users (
        username, name, avatar_url
      ) VALUES
      %L
      RETURNING *;
      `,
        formattedUserData
      );
      return db.query(queryStr);
    })
    .then(() => {
      //INSERT DATA into reviews
      const formattedReviewData = reviewData.map((review) => {
        return [
          review.title,
          review.designer,
          review.owner,
          review.review_img_url,
          review.review_body,
          review.category,
          review.created_at,
          review.votes,
        ];
      });
      const queryStr = format(
        `INSERT INTO reviews (
        title, designer, owner, review_img_url, review_body, category, created_at, votes
      ) VALUES
      %L 
      RETURNING *`,
        formattedReviewData
      );
      return db.query(queryStr);
    })
    .then(() => {
      // INSERT DATA into comments
      const formattedCommentData = commentData.map((comment) => {
        return [
          comment.body,
          comment.votes,
          comment.author,
          comment.review_id,
          comment.created_at,
        ];
      });
      const queryStr = format(
        `INSERT INTO comments(
          body, votes, author, review_id, created_at
        ) VALUES
        %L
        RETURNING *`,
        formattedCommentData
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
