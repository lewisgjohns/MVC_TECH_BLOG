//this file is used to connect to the database
const Sequelize = require('sequelize');
require('dotenv').config();

//this is the connection to the database
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  );

module.exports = sequelize;