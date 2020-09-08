import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filteredContacts } = contactContext;

	if (contacts.length == 0) {
		return <h4>Add Contacts!</h4>;
	}
	return (
		<Fragment>
			{filteredContacts !== null
				? filteredContacts.map((contact) => {
						return <ContactItem key={contact.id} contact={contact} />;
				  })
				: contacts.map((contact) => {
						return (
							<ContactItem key={contact.id} contact={contact} friend={true} />
						);
				  })}
		</Fragment>
	);
};

export default Contacts;
