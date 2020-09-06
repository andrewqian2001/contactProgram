//CRUD functionality
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

//@route    GET api/contacts
//@desc     Get friends of logged in user
//@acess    Private
router.get("/", auth, async (req, res) => {
	//always use trycatch for mongoose since it returns promises
	try {
		//contacts is an array, it uses finds the contacts the sorts them by date added
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		console.log(contacts);
		res.json(contacts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Sever error");
	}
});

//@route    POST api/contacts
//@desc     add new friends to logged in users friendslist
//@acess    Private
router.post(
	"/",
	[auth, [body("name", "name is required").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, type } = req.body;

		try {
			const newContact = new Contact({
				name: name,
				email: email,
				phone: phone,
				type: type,
				user: req.user.id,
			});

			const contact = await newContact.save();
			res.json(contact);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("sever error");
		}
	}
);

//@route    PUT api/contacts
//@desc     update friends of logged in user
//@acess    Private
router.put("/:id", auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	//Build contact object
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;
	console.log("wack");
	try {
		let contact = await Contact.findById(req.params.id); //this is the id in the url
		if (!contact) {
			return res.status(404).json({ msg: "Contact does not exist" });
		}
		console.log(req.user);
		//Make sure contact belongs to the user
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Unauthorized acess" });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);

		res.json(contact);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("sever error");
	}
});

//@route    DELETE api/contacts
//@desc     Delete a friend of logged in user
//@acess    Private
router.put("/:id", auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id); //this is the id in the url
		if (!contact) {
			return res.status(404).json({ msg: "Contact does not exist" });
		}
		console.log(req.user);
		//Make sure contact belongs to the user
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Unauthorized acess" });
		}

		await Contact.findByIdAndRemove(req.params.id);

		res.json({ msg: "Contact removed" });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("sever error");
	}
});

module.exports = router;
