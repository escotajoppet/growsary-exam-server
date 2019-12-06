const Sequelize = require('sequelize');

const DB = process.env.DB_NAME || 'growsary';
const USER = process.env.DB_USER || 'root';
const PASSWORD = process.env.DB_PASSWORD || 'password';
const HOST = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  dialect: 'mysql',
  host: HOST,
});

module.exports = sequelize;
