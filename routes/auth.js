//login and authentication
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

//@route    GET api/auth
//@desc     get logged in user
//@acess    Private
router.get("/", auth, async (req, res) => {
	//since we want this to be a protected route we passed in auth as a 2nd parameter
	try {
		//note that req.user is set in /middleware/auth
		const user = await User.findById(req.user.id).select("-password"); //findById(req.user.id).select("-password") returns info about user other then the password
		res.json(user); //sends the user in json
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Sever Error");
	}
});

//@route    POST api/auth
//@desc     Auth user and get token
//@acess    Public
router.post(
	"/",
	[
		body("email", "Enter a valid email").isEmail(),
		body("password", "Enter a password").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email }); //User.findOne returns a promise

			if (!user) {
				return res.status(400).json({ msg: "Invalid Credentials" });
			}

			const isMatch = await bcrypt.compare(password, user.password); //sees if password matches encrypted password

			if (!isMatch) {
				return res.status(400).json({ msg: "Invalid Credentials" });
			}

			//creating payload(object you want to send in the token)
			const payload = {
				user: {
					id: user.id,
				},
			};

			//creates token for user id
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
		} catch (error) {
			console.error(err.message);
			res.status(500).send("Sever Error");
		}
	}
);

module.exports = router;
