const usersRouter = require('express').Router();
const { getUsers, getUsername } = require('../controllers/users.controller');

usersRouter.route('/').get(getUsers);
usersRouter.route('/:username').get(getUsername);

module.exports = usersRouter;
