// models/Menu.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Menu = sequelize.define('Menu', {
  menuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  removido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Menu;
