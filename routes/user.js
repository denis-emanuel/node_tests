const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

module.exports = router;
