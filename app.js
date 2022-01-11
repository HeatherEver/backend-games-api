const cors = require('cors');
const express = require('express');
const apiRouter = require('./routes/api.router.js');
const {
  handlePSQL400Errors,
  handleCustomErrors,
  handle500Errors,
} = require('./errors/errors.js');
const { getEndpoints } = require('./controllers/api.controller');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
apiRouter.use('/', getEndpoints);

app.all('/*'),
  (req, res) => {
    res.status(404).send({ msg: 'path not found' });
  };

app.use(handlePSQL400Errors);
app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;
