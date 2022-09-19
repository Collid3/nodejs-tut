const usersDB = {
	users: require("../data/users.json"),
	setUsers: function (data) {
		this.users = data;
	},
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogIn = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: "Username and password are required" });
	}

	const selectedUser = usersDB.users.find((user) => user.username === username);
	if (!selectedUser) {
		return res.status(400).json({ message: `User ${username} not found` });
	}

	const match = await bcrypt.compare(password, selectedUser.password);
	if (!match) return res.status(403).json({ error: "Incorrect Password" });

	const roles = Object.values(selectedUser.roles);

	const userInfo = { username: username, roles: roles };

	const accessToken = jwt.sign({ userInfo }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "5m",
	});
	const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "1d",
	});

	const otherUsers = usersDB.users.filter((user) => user.username !== username);
	const currentUser = { ...selectedUser, refreshToken };

	usersDB.setUsers([...otherUsers, currentUser]);

	await fsPromises.writeFile(
		path.join(__dirname, "..", "data", "users.json"),
		JSON.stringify(usersDB.users)
	);

	res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None" });
	res.json({ accessToken });
};

module.exports = { handleLogIn };
