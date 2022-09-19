require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDataBase");
const port = 3500;

connectDB();

app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.use("*", (req, res) => {
	res.status(404);
	res.sendFile(path.join(__dirname, "views", "404.html"));
});

mongoose.connection.once("connected", () => {
	console.log("Database connected");
	app.listen(port, () => console.log("Server now running on port: ", port));
});
