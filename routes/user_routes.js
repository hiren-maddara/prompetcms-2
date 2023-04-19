const express = require("express");
const userController = require("../controllers/user_ctrl");
const authController = require("../controllers/auth_ctrl");

const router = express.Router();

router.post("/add", userController.addUser);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
