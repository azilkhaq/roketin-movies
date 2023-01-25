const Sequelize = require("sequelize");
const db = require("../configs/DbConfig");

const DataTypes = Sequelize;

const User = db.define('rm_users', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true
});

module.exports = User;