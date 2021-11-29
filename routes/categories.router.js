const categoriesRouter = require("express").Router();
const { getCategories } = require("../controllers/categories.controller.js");

console.log("CATEGORIES ROUTERRR");

categoriesRouter.route("/").get(getCategories);

module.exports = categoriesRouter;
