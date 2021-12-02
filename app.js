const express = require('express');
const apiRouter = require('./routes/api.router.js');
const {
  handlePSQL400Errors,
  handleCustomErrors,
  handle500Errors,
} = require('./errors/errors.js');

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

app.all('/*'),
  (req, res) => {
    res.status(404).send({ msg: 'path not found' });
  };

app.get('/'),
  (req, res, next) => {
    res.status(200).send({ msg: "hello from heather's game" });
  };

app.use(handlePSQL400Errors);
app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;
