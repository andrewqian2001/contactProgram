import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
const Register = (props) => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		phone: "",
	});

	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	const { name, email, password, password2, phone } = user;

	const authContext = useContext(AuthContext);
	const { register, error, clearErrors, isAuthenticated } = authContext;

	//we get error from the backend
	useEffect(() => {
		if (isAuthenticated) {
			props.history.push("/"); //this redirects the user to the home page
		}

		if (error === "user already exists") {
			setAlert(error, "danger");
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]); //when error changes useEffect is called

	//Changes the state when the input fields change
	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	//submits the info if valid, registers user to database with register method in AuthState
	const onSubmit = (e) => {
		if (name === "" || email === "" || password === "") {
			setAlert("Please enter all fields", "danger");
		} else if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else {
			//function from state
			register({
				name,
				email,
				password,
				phone,
			});
		}
		e.preventDefault();
	};
	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input type="text" name="name" value={name} onChange={onChange} />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input type="email" name="email" value={email} onChange={onChange} />
				</div>

				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={onChange}
						minLength="5"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirm Password:</label>
					<input
						type="password"
						name="password2"
						value={password2}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="phone">Phone Number (optional) : </label>
					<input type="number" name="phone" value={phone} onChange={onChange} />
				</div>
				<input
					type="submit"
					value="Register User"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};

export default Register;
