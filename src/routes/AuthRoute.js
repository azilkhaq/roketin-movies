const express = require('express');
const Route = express.Router();
const Auth = require('../controllers/AuthController');

/*
    Error Handling Globaly
*/
const use = fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

/*
    Route
*/
Route
    .post('/api/v1/auth/register', use(Auth.register))
    .post('/api/v1/auth/login', use(Auth.login))
module.exports = Route;
