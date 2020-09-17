//Authenticate the token for protected route, used in /routes/auth for get request

const jwt = require("jsonwebtoken");
const config = require("config");

//middle ware is a function that has access to res and req objects, this is an example
module.exports = function (req, res, next) {
	//Get the token from the header, it is set using setAuthToken in utils
	const token = req.header("x-auth-token");

	if (!token) {
		//status 401 is unauthorized
		return res.status(401).json({ msg: "No token, access denied" });
	}

	try {
		const decoded = jwt.verify(token, config.get("jwtSecret")); //after verification the payload is now in decoded and decoded = object that contains id of user

		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ msg: "Token is not valid" });
	}
};
