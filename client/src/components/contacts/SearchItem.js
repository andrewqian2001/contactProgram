import React, { useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";
import AlertContext from "../../context/alert/AlertContext";
const SearchItem = ({ contact }) => {
	const { id, name, email, phone } = contact;

	const contactContext = useContext(ContactContext);
	const { addContact, contacts } = contactContext;

	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;

	const onClick = (e) => {
		let x = 1;

		contacts.forEach((addedContact) => {
			if (addedContact.id === contact.id) {
				x = 0;
			}
		});

		if (x === 1) {
			addContact(contact);
		} else {
			setAlert("User already in contact list", "danger");
		}

		e.preventDefault();
	};

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">{name} </h3>
			<ul className="list">
				{email && (
					<li>
						<i className="fas fa-envelope-open"></i> {"  "}
						{email}
					</li>
				)}
				{phone && (
					<li>
						<i className="fas fa-phone"></i> {"  "}
						{phone}
					</li>
				)}
			</ul>
			<p>
				<button className="btn btn-success btn-sm" onClick={onClick}>
					Add contact
				</button>
			</p>
		</div>
	);
};

export default SearchItem;
