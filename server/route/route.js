const express = require("express");
const models = express.Router();
models.use("/input", require("../api/input"));
models.use("/push", require("../api/push"));

module.exports = models;
