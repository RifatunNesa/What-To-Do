const Sequelize = require('sequelize');

const DATABASE = process.env.DATABASE || 'WhatToDo';
const HOST = process.env.HOST || 'localhost';
const USERNAME = process.env.USER || 'postgres';
const PASSWORD = process.env.PASSWORD || '12345';

const db = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  logging: false,
  dialect: 'postgres',
});

module.exports = db;
