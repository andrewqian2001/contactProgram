import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
const Register = () => {
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
	const { register } = authContext;

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		console.log("wack");
		if (name === "" || email === "" || password === "") {
			setAlert("Please enter all fields", "danger");
		} else if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else {
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
