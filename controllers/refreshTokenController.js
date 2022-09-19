const usersDB = {
	users: require("../data/users.json"),
	setUsers: function (data) {
		this.users = data;
	},
};
const jwt = require("jsonwebtoken");

const handleRefresh = (req, res) => {
	const cookies = req.cookies;
	const refreshToken = cookies.jwt;

	if (!refreshToken) return res.sendStatus(401);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		const selectedUser = usersDB.users.find(
			(currentUser) => currentUser.username === user.username
		);

		if (!selectedUser) return res.sendStatus(403);

		if (err || selectedUser.username !== user.username) return res.sendStatus(403);

		const userInfo = { username: user.username, roles: user.roles };
		const accessToken = jwt.sign({ userInfo }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "5m",
		});

		res.json({ accessToken });
	});
};

module.exports = { handleRefresh };
