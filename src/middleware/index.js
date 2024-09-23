const express = require("express");
const cors = require("cors");

const applyMiddleWare = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
};

module.exports = applyMiddleWare;
