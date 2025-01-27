// models/GroupMenu.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Group = require('./Group');
const Menu = require('./Menu');

const GroupMenu = sequelize.define('GroupMenu', {
  groupId: {
    type: DataTypes.UUID,
    references: {
      model: Group,
      key: 'grupoid'
    }
  },
  menuId: {
    type: DataTypes.UUID,
    references: {
      model: Menu,
      key: 'menuid'
    }
  },
  removido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = GroupMenu;
