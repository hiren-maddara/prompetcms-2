const express = require("express");
const viewController = require("../controllers/views_ctrl");
const authController = require("../controllers/auth_ctrl");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewController.getIndex);
router.get(
  "/new-credit",
  authController.isLoggedIn,
  viewController.getCreditForm
);
router.get(
  "/credits",
  authController.isLoggedIn,
  // authController.authenticate,
  viewController.getCreditTable
);
// router.get("/credits/:filter/:order", viewController.getCreditTable);
router.get(
  "/report/:id",
  authController.isLoggedIn,
  viewController.getCreditReport
);
// router.get("/report/:id", viewController.getCreditReport);
router.get("/login", authController.isLoggedIn, viewController.getLoginPage);
router.get("/signup", authController.isLoggedIn, viewController.getSignUpPage);
router.get(
  "/database",
  authController.isLoggedIn,
  viewController.getDBManagePage
);
router.get("/admin", authController.isLoggedIn, viewController.getAdminPage);
router.get("/test", (req, res) => {});

module.exports = router;
