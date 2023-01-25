const movie = require("../models/MovieModel");
const genre = require("../models/GenreModel");

module.exports = {
    createMovie: async (req, res, next) => {

        const { genre_id, name, description, duration, movie_url, artist } = req.body;

        try {
            const data = await movie.create({
                genre_id: genre_id,
                name: name,
                description: description,
                duration: duration,
                movie_url: movie_url,
                artist: artist
            });

            return res.success('Successfuly', 200, data);
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    getAllMovie: async (req, res, next) => {
        try {
            const data = await movie.findAll({
                include: [
                    {
                        model: genre,
                        as: 'genre',
                        attributes: ['name', 'description']
                    }
                ],
            });
    
            return res.success('Successfuly', 200, data);
            
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    getMovieInfo: async (req, res, next) => {
        try {
            const data = await movie.findOne({
                include: [
                    {
                        model: genre,
                        as: 'genre',
                        attributes: ['name', 'description']
                    }
                ],
                where: {
                    id: req.params.id
                }
            });
    
            return res.success('Successfuly', 200, data);
            
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    updateMovie: async (req, res, next) => {
        try {
            const { movie_id, genre_id, name, description, duration, movie_url, artist } = req.body;
    
            const data = await movie.findOne({
                where: {
                    id: movie_id
                }
            });
    
            if (!data) return res.failValidationError("movie_id tidak ditemukan");
    
            const resData = await data.update({
                genre_id: genre_id,
                name: name,
                description: description,
                duration: duration,
                movie_url: movie_url,
                artist: artist
            });
    
            return res.success('Successfuly', 200, resData);
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    deleteMovie: async (req, res, next) => {
        try {
    
            const data = await movie.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (!data) return res.failValidationError("movie_id tidak ditemukan");
    
            await movie.destroy({
                where: {
                    id: req.params.id
                }
            });
    
            return res.success('Successfuly', 200, null);
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    }
}