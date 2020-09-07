import React, { useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);

	const { filterContacts, clearFilterContact } = contactContext;

	const onChange = ({ target: { value } }) => {
		if (value !== "") {
			filterContacts(value);
		} else {
			clearFilterContact();
		}
	};

	return (
		<form>
			<input type="text" placeholder="Filter Contacts" onChange={onChange} />
		</form>
	);
};

export default ContactFilter;
