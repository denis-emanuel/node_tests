const express = require("express");

const router = express.Router();
const dbOptions = require("../knexfile");
const knex = require("knex")(dbOptions.development);
const websiteController = require("../controllers/website");
const {
  websitesMiddleware,
  websiteIdMiddleware,
  websitesAdvancedUserMiddleware,
} = require("../middlewares/website");

router.use(websitesMiddleware);

router.use("/:id", websiteIdMiddleware);
router
  .route("/:id")
  .get(websiteController.getWebsiteById)
  .put(websiteController.updateWebsite)
  .delete(websiteController.deleteWebsite);

router.use("/", websitesAdvancedUserMiddleware);
router
  .route("/")
  .post(websiteController.createWebsite)
  .get(websiteController.getAllWebsites);

module.exports = router;
