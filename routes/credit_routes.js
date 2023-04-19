const express = require("express");
const creditController = require("../controllers/credit_ctrl");
const authController = require("../controllers/auth_ctrl");

const router = express.Router();

router.post("/new", authController.authenticate, creditController.createCredit);
router.get(
  "/all-credits",
  authController.authenticate,
  creditController.getCredits
);
router.get(
  "/credit/:id",
  authController.authenticate,
  creditController.getCredit
);

module.exports = router;
