const express = require("express");
const models = express.Router();
models.use("/input", require("../api/input"));
models.use("/push", require("../api/push"));
models.use("/test", require("../api/test"));

module.exports = models;
