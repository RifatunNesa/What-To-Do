const Sequelize = require('sequelize');
const db = require('./../config/dbConfig');

const Task = db.define(
  'Task',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    isDone: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    createdOn: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    modifiedOn: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    userName: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: 'Tasks',
    timestamps: false,
  }
);

module.exports = Task;
