import axios from "axios";
const setAuthToken = (token) => {
	if (token) {
		// used when we want to access private routes that require a token
		axios.defaults.headers.common["x-auth-token"] = token;
	} else {
		delete axios.defaults.headers.common["x-auth-token"];
	}
};

export default setAuthToken;
