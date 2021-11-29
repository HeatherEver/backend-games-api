const { fetchCategories } = require("../models/categories.model.js");

exports.getCategories = (req, res, next) => {
  console.log("FAT CONTROLLER");
  fetchCategories().then((categories) => {
    res.status(200).send({ categories: categories });
  });
};
