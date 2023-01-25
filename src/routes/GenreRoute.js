const express = require('express');
const Route = express.Router();
const Genre = require('../controllers/GenreController');
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
    .post('/api/v1/genre/create', middleware.checkAuth, use(Genre.createGenre))
    .get('/api/v1/genre/list', middleware.checkAuth, use(Genre.getAllGenre))
    .get('/api/v1/genre/info/:id', middleware.checkAuth, use(Genre.getGenreInfo))
    .post('/api/v1/genre/update', middleware.checkAuth, use(Genre.updateGenre))
    .delete('/api/v1/genre/delete/:id', middleware.checkAuth, use(Genre.deleteGenre))
module.exports = Route;
