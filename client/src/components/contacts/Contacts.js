import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filteredContacts, getContacts } = contactContext;

	useEffect(() => {
		getContacts();
		//eslint-disable-next-line
	}, []);

	if (contacts == null) {
		return <h4>Add Contacts!</h4>;
	}
	//renders filtered list if user has entered anything into the search bar
	return (
		<Fragment>
			{filteredContacts !== null
				? filteredContacts.map((contact) => {
						return <ContactItem key={contact._id} contact={contact} />;
				  })
				: contacts.map((contact) => {
						return (
							<ContactItem key={contact._id} contact={contact} friend={true} />
						);
				  })}
		</Fragment>
	);
};

export default Contacts;
