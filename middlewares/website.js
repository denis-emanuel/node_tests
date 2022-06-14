const dbOptions = require("../knexfile");
const knex = require("knex")(dbOptions[process.env.NODE_ENV]);
const jwt = require("jsonwebtoken");

exports.websitesMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).send({
      success: false,
      message: "No token provided",
    });
  }

  //verify if token signature is valid
  const decoded = jwt.verify(token, process.env.REGISTER_PRIVATE_KEY);
  if (decoded === undefined) {
    return res.status(400).send({
      success: false,
      message: "Invalid token",
    });
  }

  //verify if token is expired
  if (decoded.exp * 1000 <= Date.now()) {
    return res.status(401).send({
      success: false,
      message: "Token expired",
    });
  }

  if (decoded.role !== "basic" && decoded.role !== "advanced") {
    console.log(decoded.role);
    return res.status(403).send({
      success: false,
      message: "No permission",
    });
  }

  //pass decoded info about user to the next middleware
  const user = await knex("users").where({ email: decoded.email }).first();

  res.locals.user = user;

  next();
};

exports.websiteIdMiddleware = async (req, res, next) => {
  const userId = res.locals.user.id;
  const website = await knex("websites").where({ id: req.params.id }).first();

  if (res.locals.user.role !== "advanced" && userId !== website?.user_id) {
    return res.status(401).send({
      success: false,
      message: "User is not the owner of the website or user is not an admin",
    });
  }

  next();
};

exports.websitesAdvancedUserMiddleware = async (req, res, next) => {
  if (res.locals.user.role !== "advanced") {
    return res.status(401).send({
      success: false,
      message: "User is not an admin",
    });
  }
  next();
};
