const express = require('express');
const Route = express.Router();
const Movie = require('../controllers/MovieController');
const middleware = require('../middlewares/Auth');

/*
    Error Handling Globaly
*/
const use = fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

/*
    Route
*/
Route
    .post('/api/v1/movie/create', middleware.checkAuth, use(Movie.createMovie))
    .get('/api/v1/movie/list', middleware.checkAuth, use(Movie.getAllMovie))
    .get('/api/v1/movie/info/:id', middleware.checkAuth, use(Movie.getMovieInfo))
    .post('/api/v1/movie/update', middleware.checkAuth, use(Movie.updateMovie))
    .delete('/api/v1/movie/delete/:id', middleware.checkAuth, use(Movie.deleteMovie))
module.exports = Route;
