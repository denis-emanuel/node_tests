const dbOptions = require("../knexfile");
const knex = require("knex")(dbOptions.development);

const { websiteSchema } = require("../schemas/website");

exports.createWebsite = async (req, res) => {
  try {
    await websiteSchema.validateAsync(req.body);

    await knex("websites").insert({ ...req.body });

    res.status(200).send({
      success: true,
      message: "Website created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false });
  }
};

exports.updateWebsite = async (req, res) => {
  try {
    await websiteSchema.validateAsync(req.body);

    const website = await knex("websites")
      .where({
        id: req.params.id,
      })
      .update(req.body);

    res.status(200).send({
      success: true,
      message: "Website updated successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.getWebsiteById = async (req, res) => {
  try {
    const website = await knex("websites").where({ id: req.params.id });

    res.status(200).send({
      success: true,
      data: website,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.getAllWebsites = async (req, res) => {
  try {
    const websites = await knex("websites").select();

    res.status(200).send({
      success: true,
      data: websites,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.deleteWebsite = async (req, res) => {
  try {
    await knex("websites").where({ id: req.params.id }).del();

    res.status(200).send({
      success: true,
      message: "Website deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
