const apiRouter = require("express").Router();
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./review.router");

console.log("API ROUTERRR");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
