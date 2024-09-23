const { DataTypes } = require("sequelize");

const sequelize = require("../DB/index");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logInTime: {
      type: DataTypes.DATE,
    },
    registrationTime: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM("active", "blocked"),
      defaultValue: "active",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

module.exports = User;
