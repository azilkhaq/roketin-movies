const userActivity = require("../models/UserActivity");
const movie = require("../models/MovieModel");
const { decodeToken } = require("../helpers/DecodeToken");

module.exports = {
    userActivityLiked: async (req, res, next) => {

        const decoded = decodeToken(req.get("Authorization"))
        const userId = decoded.user_id;

        const { movie_id, status } = req.body;

        try {
            const data = await userActivity.create({
                user_id: userId,
                movie_id: movie_id,
                status: status,
            });

            return res.success('Successfuly', 200, data);
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    userActivityWatched: async (req, res, next) => {

        const decoded = decodeToken(req.get("Authorization"))
        const userId = decoded.user_id;

        const { movie_id, status } = req.body;

        try {
            const data = await userActivity.create({
                user_id: userId,
                movie_id: movie_id,
                status: status,
            });

            return res.success('Successfuly', 200, data);
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    userActivitySummary: async (req, res, next) => {

        try {
            const movieData = await movie.findAll();

            const listData = [];

            for (let i = 0; i < movieData.length; i++) {

                const userActivityDataLiked = await userActivity.count({
                    where: {
                        movie_id: movieData[i].id,
                        status: "liked"
                    }
                });

                const userActivityDataWatched = await userActivity.count({
                    where: {
                        movie_id: movieData[i].id,
                        status: "watched"
                    }
                });

                listData.push({
                    movieName: movieData[i].name,
                    totalLiked: userActivityDataLiked,
                    totalWatched: userActivityDataWatched,
                });
            }

            return res.success('Successfuly', 200, listData);
            
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    }
}