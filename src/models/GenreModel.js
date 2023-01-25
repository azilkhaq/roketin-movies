const Sequelize = require("sequelize");
const db = require("../configs/DbConfig");

const DataTypes = Sequelize;

const Genre = db.define('rm_genres', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    freezeTableName: true
});

module.exports = Genre;