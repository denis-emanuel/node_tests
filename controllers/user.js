const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

const dbOptions = require("../knexfile");
const knex = require("knex")(dbOptions.development);

const { userRegisterSchema, userLoginSchema } = require("../schemas/user");

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // data validation
    await userRegisterSchema.validateAsync(req.body);

    // verify if user already exists
    const user = await knex("users").where({ email });
    if (user[0]) {
      return res.status(409).send({
        success: false,
        message: "User with given email already exists",
      });
    }

    //encrypt password and save user to db
    const encryptedPassword = await bcrypt.hash(password, 10);
    await knex("users").insert({
      ...req.body,
      password: encryptedPassword,
      role: "basic",
    });

    res.status(200).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Register error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // validate data
    await userLoginSchema.validate(req.body);
    const { email, password } = req.body;

    // verify if user exists
    const user = await knex("users").where({ email });
    if (!user[0]) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    await bcrypt.compare(password, user[0].password, function (err, same) {
      if (same) {
        const token = jwt.sign(
          { email, role: "basic" },
          process.env.REGISTER_PRIVATE_KEY,
          {
            expiresIn: "1h",
            algorithm: "HS256",
          }
        );
        res.status(200).send(token);
      } else {
        res.status(400).send({
          success: false,
          message: "passwords do not match",
        });
      }
    });
  } catch (err) {
    res.status(400).send("Email or password missing");
  }
};
