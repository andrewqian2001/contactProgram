import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem("token"),
		isAuthenticated: null,
		loading: true,
		error: null,
		user: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	//load user
	const loadUser = () => {
		console.log("Wack");
	};

	//register user
	const register = async (formData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			//no need to enter local host since we have proxy value
			const res = await axios.post("/api/users", formData, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg,
			});
		}
	};
	//login user
	const login = () => {
		console.log("Wack");
	};

	//logout
	const logout = () => {
		console.log("Wack");
	};
	//clear errors
	const clearErrors = () => {
		console.log("Wack");
	};
	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				loadUser,
				login,
				logout,
				clearErrors,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
