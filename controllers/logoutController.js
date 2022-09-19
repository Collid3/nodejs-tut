const usersDB = {
	users: require("../data/users.json"),
	setUsers: function (data) {
		this.users = data;
	},
};
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	const refreshToken = cookies.jwt;

	const selectedUser = usersDB.users.find((user) => (user.refreshToken = refreshToken));
	if (!selectedUser) return res.status(204).json({ message: "No user logged in" });

	const otherUsers = usersDB.users.filter((user) => user.username !== selectedUser.username);
	selectedUser.refreshToken = "";
	usersDB.setUsers([...otherUsers, selectedUser]);

	await fsPromises.writeFile(
		path.join(__dirname, "..", "data", "users.json"),
		JSON.stringify(usersDB.users)
	);
	res.clearCookie("jwt", { httpOnly: true });

	res.json({ message: "User successfully logged out" });
};

module.exports = { handleLogout };
