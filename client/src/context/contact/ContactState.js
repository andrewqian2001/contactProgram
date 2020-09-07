import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER_CONTACT,
} from "../types";

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				name: "John Cena",
				email: "huancena@gmail.com",
				phone: "91209312",
				type: "professional",
				id: "5",
			},
			{
				name: "dowiaj",
				email: "wapjd@gmail.com",
				phone: "1111111111",
				type: "personal",
				id: "7",
			},
		],
		filteredContacts: null,
		filteredSearch: null,
		currentContact: null,
	};
	const [state, dispatch] = useReducer(ContactReducer, initialState);

	// Add contact to list
	const addContact = (contact) => {
		contact.id = uuidv4();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};
	//Delete contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	// Filter contact list
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACT, payload: text });
	};

	//Clear filter
	const clearFilterContact = () => {
		dispatch({ type: CLEAR_FILTER_CONTACT });
	};

	//Send friend request

	//Accept friend request

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				addContact,
				deleteContact,
				filteredContacts: state.filteredContacts,
				filterContacts,
				clearFilterContact,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
