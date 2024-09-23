const { Sequelize } = require("sequelize");

const sequlize = new Sequelize(
  process.env.DATABASENAME,
  process.env.DATABASEUSERNAME,
  process.env.DATABASEPASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    port: process.env.DBPORT,
    logging: false,
  }
);

module.exports = sequlize;
