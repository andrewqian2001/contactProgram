const express = require("express");

const app = express();

//checks if there is an env variable called port first(this will be used in production), otherwise it uses the local host
const PORT = process.env.PORT || 5000;

//declares routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => {
	console.log(`Sever started on port ${PORT}`);
});
