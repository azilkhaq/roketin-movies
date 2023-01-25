const express = require('express');
const Route = express.Router();
const UserActivity = require('../controllers/UserActivityController');
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
    .post('/api/v1/user-activity/liked', middleware.checkAuth, use(UserActivity.userActivityLiked))
    .post('/api/v1/user-activity/watched', middleware.checkAuth, use(UserActivity.userActivityWatched))
    .get('/api/v1/user-activity/summary', middleware.checkAuth, use(UserActivity.userActivitySummary))
module.exports = Route;
