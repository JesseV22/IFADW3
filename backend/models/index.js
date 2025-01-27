// models/index.js
const Group = require('./Group');
const Menu = require('./Menu');
const GroupMenu = require('./GroupMenu');
const User = require('./User');

Group.belongsToMany(Menu, { through: GroupMenu });
Menu.belongsToMany(Group, { through: GroupMenu });

module.exports = { Group, Menu, GroupMenu, User };
