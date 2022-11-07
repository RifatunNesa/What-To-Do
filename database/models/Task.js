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
      unique: true,
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
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
