//Register
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/User");

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
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.send("noice");
	}
);

module.exports = router;
