const { response } = require("express");
const { fetchCategories } = require("../models/categories.model.js");

exports.getCategories = (req, res, next) => {
  console.log("controller says Hi!");
};
