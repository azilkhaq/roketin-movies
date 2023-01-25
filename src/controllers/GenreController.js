const genre = require("../models/GenreModel");

module.exports = {
    createGenre: async (req, res, next) => {

        const { name, description } = req.body;

        try {
            const data = await genre.create({
                name: name,
                description: description,
            });

            return res.success('Successfuly', 200, data);
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    getAllGenre: async (req, res, next) => {
        try {
            const data = await genre.findAll();
    
            return res.success('Successfuly', 200, data);
            
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    getGenreInfo: async (req, res, next) => {
        try {
            const data = await genre.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            return res.success('Successfuly', 200, data);
            
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    updateGenre: async (req, res, next) => {
        try {
            const { genre_id, name, description } = req.body;
    
            const data = await genre.findOne({
                where: {
                    id: genre_id
                }
            });
    
            if (!data) return res.failValidationError("genre_id tidak ditemukan");
    
            const resData = await data.update({
                name: name,
                description: description
            });
    
            return res.success('Successfuly', 200, resData);
        } catch (error) {
            return res.fail("Bad Request", error.message);
        }
    },
    deleteGenre: async (req, res, next) => {
        try {
    
            const data = await genre.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (!data) return res.failValidationError("genre_id tidak ditemukan");
    
            await genre.destroy({
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