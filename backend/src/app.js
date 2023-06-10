const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization,Access-Control-Allow-Origin",
  exposedHeaders: "Content-Type,Authorization,Access-Control-Allow-Origin",
  optionsSuccessStatus: 200,
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(helmet());
app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Referrer-Policy", "origin-when-cross-origin");
  next();
});

app.use("/v1", router);
app.use(errorHandler);

app.get("/healthcheckupcostsmoney", (req, res) =>
  res.send("dev on 20220729")
); // to test server status

module.exports = { app, server };
