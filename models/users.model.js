const db = require('../db/connection');

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users;`).then((res) => {
    return res.rows;
  });
};

exports.fetchUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Path not found' });
      }
      return rows;
    });
};
