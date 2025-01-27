// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  removido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;
