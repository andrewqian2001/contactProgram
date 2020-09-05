//CRUD functionality
const express = require("express");
const router = express.Router();

//@route    GET api/contacts
//@desc     Get friends of logged in user
//@acess    Private
router.get("/", (req, res) => {
	res.send("Get friends of logged in user");
});

//@route    POST api/contacts
//@desc     add new friends to logged in users friendslist
//@acess    Private
router.post("/", (req, res) => {
	res.send("Add new friends");
});

//@route    PUT api/contacts
//@desc     update friends of logged in user
//@acess    Private
router.put("/:id", (req, res) => {
	res.send("Update friends");
});

//@route    DELETE api/contacts
//@desc     Delete a friend of logged in user
//@acess    Private
router.put("/:id", (req, res) => {
	res.send("Delete contacts");
});

module.exports = router;
