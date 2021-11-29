const db = require("../db/connection.js");

exports.fetchCategories = () => {
  console.log("MODEL");
  return db.query(`SELECT * FROM categories`).then((res) => {
    return res.rows;
  });
};
