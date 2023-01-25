const express = require('express');
const Route = express.Router();
const auth = require('./routes/AuthRoute');
const genre = require('./routes/GenreRoute');
const movie = require('./routes/MovieRoute');
const userActivity = require('./routes/UserActivityRoute');

Route.use('/', auth);
Route.use('/', genre);
Route.use('/', movie);
Route.use('/', userActivity);

module.exports = Route;
