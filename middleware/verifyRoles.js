const jwt = require("jsonwebtoken");

const verifyRoles = (...allowedRoles) => {
	return (req, res, next) => {
		const rolesArray = [...allowedRoles];
		const result = rolesArray
			.map((role) => req.roles.includes(role))
			.find((role) => role === true);

		if (!result) return res.sendStatus(403);
		next();
	};
};

module.exports = verifyRoles;
