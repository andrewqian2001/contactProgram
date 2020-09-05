//Register
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route    POST api/user
//@desc     Register a user
//@acess    Public
router.post(
	"/",
	[
		//the first parameter is the attribute and the 2nd parameter is the msg we send if its not met
		body("name", "name is required").not().isEmpty(),
		body("email", "enter valid email").isEmail(),
		body(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			//note that schema auto creates an id
			let user = await User.findOne({ email: email });
			if (user) {
				return res.status(400).json({ msg: "user already exists" });
			}
			user = new User({ name: name, email: email, password: password }); //made with model

			//encrypt password using bcrypt
			const salt = await bcrypt.genSalt(10);

			//hashed version of password
			user.password = await bcrypt.hash(password, salt);

			await user.save(); //saves to connected database

			//creating json webtoken

			//creating payload(object you want to send in the token)
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);

			//encrypt the password
		} catch (error) {
			console.log(error.message);
			res.status(500).send("sever error");
			//status 500 is a sever error
		}
	}
);

module.exports = router;
