const express = require("express");
const app = express();

const config = require("config");
const Joi = require("joi");
const debug = require("debug")("app:startup");
const pug = require("pug");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");

process.env.NODE_ENV;
app.use("/api/courses", courses);
app.use("/", home);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(logger);

app.set("view engine", "pug");
app.set("views", "./views");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled");
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
