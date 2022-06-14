const knex = require("../knex/knex");

const { websiteSchema } = require("../schemas/website");

exports.createWebsite = async (req, res) => {
  try {
    await websiteSchema.validateAsync(req.body);

    await knex("websites").insert({ user_id: res.locals.user.id, ...req.body });

    return res.status(200).send({
      success: true,
      message: "Website created successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Website creation failed",
      error: err.message,
    });
  }
};

exports.updateWebsite = async (req, res) => {
  return res.send({ success: "abc" });
  // try {
  //   await websiteSchema.validateAsync(req.body);

  //   await knex("websites")
  //     .where({
  //       id: req.params.id,
  //     })
  //     .update(req.body);

  //   return res.status(200).send({
  //     success: true,
  //     message: "Website updated successfully",
  //   });
  // } catch (err) {
  //   return res.status(400).json({ success: false });
  // }
};

exports.getWebsiteById = async (req, res) => {
  try {
    const website = await knex("websites").where({ id: req.params.id });

    return res.status(200).send({
      success: true,
      data: website,
    });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

exports.getAllWebsites = async (req, res) => {
  try {
    const websites = await knex("websites").select();

    return res.status(200).send({
      success: true,
      data: websites,
    });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

exports.deleteWebsite = async (req, res) => {
  try {
    await knex("websites").where({ id: req.params.id }).del();

    return res.status(200).send({
      success: true,
      message: "Website deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};
