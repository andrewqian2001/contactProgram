const express = require("express");
const connectDB = require("./config/db");
const app = express();

//checks if there is an env variable called port first(this will be used in production), otherwise it uses the local host
const PORT = process.env.PORT || 5000;

//Connects database
connectDB();

//init middleware
app.use(express.json({ extended: false })); //allows us to send/recieve json data

//declares routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => {
	console.log(`Sever started on port ${PORT}`);
});
