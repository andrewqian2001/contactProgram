const mongoose = require("mongoose");

//used to structure database
const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("user", UserSchema); //these are models
//an instance of a model is called a document, Models are responsible for creating and reading documents from the underlying MongoDB database.
