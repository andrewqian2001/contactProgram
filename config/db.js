const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
	mongoose
		.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})
		.then(() => {
			console.log("MongoDB connected");
		})
		.catch((error) => {
			console.log(error.message);
			process.exit(1); //exits the program with failure
		});
};

module.exports = connectDB;
