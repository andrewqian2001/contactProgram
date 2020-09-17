import React, { useReducer } from "react";
import axios from "axios"; //note that axios is a part of node
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";
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

//We want the state data and functions avalible for the rest of our program so we store anything to do with authentication in this state

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
	const loadUser = async () => {
		//the token in local storage is set when the reducer is called with REGISTER_SUCCESS
		if (localStorage.token) {
			setAuthToken(localStorage.token); //this will allow  the auth middleware to access the token from the header
		}

		try {
			//gets user object from routes/auth in backend
			const res = await axios.get("/api/auth");

			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (error) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	//register user, gets formData from Components/auth/Register.js
	const register = async (formData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			//no need to enter local host since we have proxy value
			const res = await axios.post("/api/users", formData, config);
			//the post request is recieved in the backend, routes

			//dispatches to reducer, token is added to state and local storage
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			loadUser();
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg,
			});
		}
	};
	//login user
	const login = async (formData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			//no need to enter local host since we have proxy value
			const res = await axios.post("/api/auth", formData, config);
			//the post request is recieved in the backend, routes

			//dispatches to reducer, token is added to state and local storage
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			loadUser();
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg,
			});
		}
	};

	//logout
	const logout = () => {
		dispatch({
			type: LOGOUT,
		});
	};
	//clear errors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
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
