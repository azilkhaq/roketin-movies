const Sequelize = require("sequelize");
const db = require("../configs/DbConfig");

const DataTypes = Sequelize;

const UserActivity = db.define('rm_user_activities', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true
});

module.exports = UserActivity;