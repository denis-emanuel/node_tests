require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/user");
const websiteRouter = require("./routes/website");

const server = express();

if (process.env.NODE_ENV === "development") {
  server.use(morgan("dev"));
}

server.use(express.json());
server.use("/api/users", userRouter);
server.use("/api/websites", websiteRouter);

module.exports = server;
