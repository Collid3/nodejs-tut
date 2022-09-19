const router = require("express").Router();
const refreshTokenController = require("../controllers/refreshTokenController");

router.get("/", refreshTokenController.handleRefresh);

module.exports = router;
