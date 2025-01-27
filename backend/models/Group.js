// models/Group.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Group = sequelize.define('Group', {
  grupoid: {
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
  removido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Group;
