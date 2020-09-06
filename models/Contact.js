const mongoose = require("mongoose");

//used to structure database
const ContactSchema = mongoose.Schema({
	//note for user attribute below, Even though your mongoose model identifies as a single user, when MongoDB auto creates that table for you using the mongoose model, it will pluralize whatever you wrote (in this case a single 'user'), and create a table called 'users' because it understands that the table will hold not only one 'user' but many. If you wrote 'dog', your table would be called 'dogs'. If 'baby', the table would be called 'babies', etc.. Your model is of a single entry into the table. The table name therefore should logically be the plural of whatever you defined.
	user: {
		type: mongoose.Schema.Types.ObjectId, //specific objects for mongoDB
		ref: "users",
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	type: {
		type: String,
		default: "personal",
	},
});

module.exports = mongoose.model("contact", ContactSchema); //these are models
//an instance of a model is called a document, Models are responsible for creating and reading documents from the underlying MongoDB database.
