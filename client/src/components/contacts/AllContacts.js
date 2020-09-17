import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";
import SearchItem from "./SearchItem";

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { allContacts, searchedContacts } = contactContext;

	if (allContacts == null) {
		return <h4>Search Contacts!</h4>;
	}

	allContacts.forEach((contact) => {
		console.log(contact);
	});
	//maps searchedContacts if the user has entered something into the search bar, other wise maps all contacts in the database
	return (
		<Fragment>
			{searchedContacts !== null
				? searchedContacts.map((contact) => {
						return <SearchItem key={contact._id} contact={contact} />;
				  })
				: allContacts.map((contact) => {
						return (
							<SearchItem key={contact._id} contact={contact} friend={true} />
						);
				  })}
		</Fragment>
	);
};

export default Contacts;
