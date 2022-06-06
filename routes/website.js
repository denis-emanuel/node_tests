const express = require("express");
const websiteController = require("../controllers/website");
const router = express.Router();

router
  .route("/")
  .post(websiteController.createWebsite)
  .get(websiteController.getAllWebsites);

router
  .route("/:id")
  .get(websiteController.getWebsiteById)
  .put(websiteController.updateWebsite)
  .delete(websiteController.deleteWebsite);

module.exports = router;
