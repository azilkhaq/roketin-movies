const Sequelize = require("sequelize");
const db = require("../configs/DbConfig");
const Genre = require("./GenreModel");

const DataTypes = Sequelize;

const Movie = db.define('rm_movies', {
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    movie_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true
});

Movie.hasOne(Genre, {
    foreignKey: 'id',
    sourceKey: 'genre_id',
    as: 'genre'
});

Genre.belongsTo(Movie, {
    foreignKey: 'id',
    targetKey: 'genre_id'
});


module.exports = Movie;