const express = require("express");
require("dotenv").config();
var colors = require("colors");
const applyMiddleWare = require("./src/middleware");
const router = require("./src/router/index");
const sequlize = require("./src/DB/index");

const app = express();
const port = process.env.Port || 4000;

applyMiddleWare(app);
app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Api is working fine!" });
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server error occured",
    error: err.errors,
  });
});

const main = async () => {
  try {
    await sequlize.authenticate();
    await sequlize.sync();
    console.log(colors.green("Database Connected Successfully"));
    app.listen(port, () => {
      console.log(colors.green(`App listening on port ${port}`));
    });
  } catch (error) {
    console.log(colors.red("Something went wrong while connectiong DataBase"));
    console.log(error);
  }
};

main();
