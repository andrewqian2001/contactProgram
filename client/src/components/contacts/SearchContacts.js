import React, { useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";

const SearchContacts = () => {
	const contactContext = useContext(ContactContext);

	const { searchContacts, clearSearch } = contactContext;

	const onChange = ({ target: { value } }) => {
		if (value !== "") {
			searchContacts(value);
		} else {
			clearSearch();
		}
	};

	return (
		<form>
			<input type="text" placeholder="Filter Contacts" onChange={onChange} />
		</form>
	);
};

export default SearchContacts;
