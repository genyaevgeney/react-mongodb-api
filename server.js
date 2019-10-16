const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiPort = 3000;
const db = require("./database").connection;
const passport = require("passport");

exports.router = express.Router();
const userRouter = require("./router/user");
const donationRouter = require("./router/donation");

exports.configure = async () => {
  app.use(passport.initialize());
  require("./passport")(passport);
  app.use(async (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/", userRouter);
  app.use("/", donationRouter);
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};

exports.start = () => {
  app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
};
