const dbOptions = require("../knexfile");
const knex = require("knex")(dbOptions.development);

const { userRegisterSchema } = require("../schemas/user");

exports.registerUser = async (req, res) => {
  try {
    await userRegisterSchema.validateAsync(req.body);

    await knex("users").insert({ ...req.body });

    res
      .status(200)
      .send({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err?.details[0].message });
  }
};

exports.loginUser = (req, res) => {};
