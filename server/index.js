const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const port = 8000;

var corsOptions = {
  origin: "http://localhost:3000/",
};

app.use(cors());
app.options("*", cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.send({ message: "ok" });
});

require("./routes/todo.routes.js")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
