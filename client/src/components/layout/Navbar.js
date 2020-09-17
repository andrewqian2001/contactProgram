import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);

	const { isAuthenticated, logout, user } = authContext;

	const onLogout = () => {
		logout();
	};

	//links for when user is authenticated
	const authLinks = ( //use round brackets for jsx
		<Fragment>
			<li>Hello {user && user.name} !</li>
			<li>
				<a onClick={onLogout} href="#!">
					<i className="fas fa-sign-out-alt"></i>{" "}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
	);

	//links for when user is not authenticated
	const guestLinks = ( //use round brackets for jsx
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	);
	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon} />
				{title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};

Navbar.defaultProps = {
	title: "Contact Program",
	icon: "fas fa-id-card-alt",
};

export default Navbar;
