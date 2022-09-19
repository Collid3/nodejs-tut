const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|index(.html)?", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/contacts(.html)?", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "contacts.html"));
});

router.get("/contact(.html)?", (req, res) => {
	res.redirect(301, "contacts.html");
});

module.exports = router;
