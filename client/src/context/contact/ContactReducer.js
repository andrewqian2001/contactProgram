import {
	GET_ALL_CONTACTS,
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER_CONTACT,
	SEARCH_CONTACT,
	CLEAR_SEARCH,
	CONTACT_ERROR,
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload],
				//this updates our state, updates the contacts
				loading: false,
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact.id !== action.payload
				),
				loading: false,
			};
		case FILTER_CONTACT:
			return {
				...state,
				filteredContacts: state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, "gi");
					return contact.name.match(regex) || contact.email.match(regex);
				}),
			};
		case CLEAR_FILTER_CONTACT:
			return {
				...state,
				filteredContacts: null,
			};
		case SEARCH_CONTACT:
			return {
				...state,
				searchedContacts: state.AllContacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, "gi");
					return contact.name.match(regex) || contact.email.match(regex);
				}),
			};
		case CLEAR_SEARCH:
			return {
				...state,
				searchedContacts: null,
			};
		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
