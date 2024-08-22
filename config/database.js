const { Sequelize } = require('sequelize');
const { pg } = require('pg');

const sequelize = new Sequelize({
  dialect: "postgres",
  dialectModule: pg,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

module.exports = sequelize;