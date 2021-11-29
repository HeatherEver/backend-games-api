const apiRouter = require("express").Router();
const categoriesRouter = require("./categories.router");
console.log("API ROUTERRR");

apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;
