const express = require("express");
const router = express.Router();
const authController = require("../controllers/authContoller");

router.post("/", authController.handleLogIn);

module.exports = router;
