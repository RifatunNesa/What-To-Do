const Sequelize = require('sequelize');
const db = require('../config/dbConfig');

const User = db.define(
  'User',
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    userName: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    passwordChangedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    createdOn: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    modifiedOn: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: 'Users',
    timestamps: false,
  }
);

module.exports = User;
