const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.db_database,
  process.env.db_username,
  process.env.db_password,
  {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
  }
);

module.exports = sequelize;
