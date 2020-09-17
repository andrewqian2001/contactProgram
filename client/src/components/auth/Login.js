import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
const Login = (props) => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	const { email, password } = user;

	const authContext = useContext(AuthContext);
	const { login, error, clearErrors, isAuthenticated } = authContext;

	//we get error from the backend
	useEffect(() => {
		if (isAuthenticated) {
			props.history.push("/"); //this redirects the user to the home page
		}

		if (error === "Invalid Credentials") {
			setAlert(error, "danger");
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]); //when error changes useEffect is called

	const onChange = (e) => {
		//changes the state
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		login({
			email,
			password,
		});
		e.preventDefault();
	};
	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Login</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={onChange}
						required
					/>
				</div>

				<input
					type="submit"
					value="Login"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};

export default Login;
