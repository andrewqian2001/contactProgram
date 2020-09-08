import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";
import SearchItem from "./SearchItem";

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { allContacts, searchedContacts } = contactContext;

	if (allContacts.length == 0) {
		return <h4>Search Contacts!</h4>;
	}
	return (
		<Fragment>
			{searchedContacts !== null
				? searchedContacts.map((contact) => {
						return <SearchItem key={contact.id} contact={contact} />;
				  })
				: allContacts.map((contact) => {
						return (
							<SearchItem key={contact.id} contact={contact} friend={true} />
						);
				  })}
		</Fragment>
	);
};

export default Contacts;
