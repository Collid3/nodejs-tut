const usersDB = {
	users: require("../data/users.json"),
	setUsers: function (data) {
		this.users = data;
	},
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
	const { username, pwd } = req.body;

	if (!username || !pwd) {
		return res.status(400).json({ message: "Username and password are required" });
	}
	const duplicate = usersDB.users.find((user) => user.username === username);
	if (duplicate) {
		return res.status(409).json({ message: `User ${username} is already used` });
	}

	const hashedPwd = await bcrypt.hash(pwd, 10);
	const newUser = { username: username, roles: { User: 3334 }, password: hashedPwd };
	usersDB.setUsers([...usersDB.users, newUser]);

	try {
		await fsPromises.writeFile(
			path.join(__dirname, "..", "data", "users.json"),
			JSON.stringify(usersDB.users)
		);

		res.status(201).json({ message: "User successfully created" });
		console.log(usersDB.users);
	} catch (err) {
		res.status(500).send("Something went wrong");
	}
};

module.exports = { handleNewUser };
