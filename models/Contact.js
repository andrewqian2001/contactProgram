const mongoose = require("mongoose");

//used to structure database
const ContactSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId, //specific objects for mongoDB
		ref: "users",
	},
});

module.exports = mongoose.model("contact", ContactSchema); //these are models
//an instance of a model is called a document, Models are responsible for creating and reading documents from the underlying MongoDB database.
