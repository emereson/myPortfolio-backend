const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Project = db.define('project', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  linkPage: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  projectImg: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
});

module.exports = Project;
