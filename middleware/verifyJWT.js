const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers["authorization"] || req.header["Authorization"];
	if (!authHeader || !authHeader.startsWith("Bearer")) return res.sendStatus(401);
	const accessToken = authHeader.split(" ")[1];

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.username = user.userInfo.username;
		req.roles = user.userInfo.roles;
		next();
	});
};

module.exports = verifyJWT;
