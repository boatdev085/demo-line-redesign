const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./server/route/route");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);

app.use(express.static("build"));
app.get("/static", (req, res) => {
  res.sendFile(path.resolve(__dirname, "src/assets"));
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 8081;
app.listen(port);

console.log("App is listening on port " + port);
