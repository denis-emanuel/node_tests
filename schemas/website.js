const Joi = require("joi");

exports.websiteSchema = Joi.object({
  user_id: Joi.number(),
  name: Joi.string().alphanum().min(3).max(30),
  domain: Joi.string().alphanum().min(3).max(30),
});
