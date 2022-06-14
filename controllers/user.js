const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

const knex = require("../knex/knex");
const { userRegisterSchema, userLoginSchema } = require("../schemas/user");

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // data validation
    await userRegisterSchema.validateAsync(req.body);

    // verify if user already exists
    const user = await knex("users").where({ email }).first();

    if (user) {
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
      role: "advanced",
    });

    return res.send({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (err) {
    return res.status(400).send({ success: false, message: "Register error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // validate data
    await userLoginSchema.validateAsync(req.body);
    const { email, password } = req.body;

    // verify if user exists
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    await bcrypt.compare(password, user.password, function (err, same) {
      if (same) {
        const token = jwt.sign(
          { email, role: "advanced" },
          process.env.REGISTER_PRIVATE_KEY,
          {
            expiresIn: "1h",
            algorithm: "HS256",
          }
        );
        return res.status(200).send({ token });
      } else {
        return res.status(400).send({
          success: false,
          message: "passwords do not match",
        });
      }
    });
  } catch (err) {
    res.status(400).send("Email or password missing");
  }
};
