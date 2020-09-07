import React, { useState, useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	//remember that use state returns an array with 2 things, the state and the function to modify the state, in our case we set the state to the initial object, then it gets returned as contact, and we have a function to store contact
	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		type: "personal",
	});

	const { name, email, phone, type } = contact;

	//note that we definined the values of e.target like name with <input
	// 	type="text"
	// 	placeholder="Phone"
	// 	name="phone"
	// 	value={phone}
	// 	onChange={onChange}
	// />, the name = "name" is what makes it work
	const onChange = (e) =>
		setContact({ ...contact, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		contactContext.addContact(contact);
		setContact({
			name: "",
			email: "",
			phone: "",
			type: "personal",
		});
		e.preventDefault();
	};
	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">Add Contact</h2>
			<input
				type="text"
				placeholder="Name"
				name="name"
				value={name}
				onChange={onChange}
			/>
			<input
				type="email"
				placeholder="Email"
				name="email"
				value={email}
				onChange={onChange}
			/>
			<input
				type="text"
				placeholder="Phone"
				name="phone"
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<input
				type="radio"
				name="type"
				value="personal"
				checked={type === "personal"}
				onChange={onChange}
			/>
			Personal{" "}
			<input
				type="radio"
				name="type"
				value="professional"
				checked={type === "professional"}
				onChange={onChange}
			/>
			Professional
			<div>
				<input
					type="submit"
					value="Add Contact"
					className="btn btn-primary btn-block"
				/>
			</div>
		</form>
	);
};

export default ContactForm;
