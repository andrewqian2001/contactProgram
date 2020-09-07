import {
	ADD_CONTACT,
	DELETE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER_CONTACT,
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload],
				//this updates our state, updates the contacts
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact.id !== action.payload
				),
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
		default:
			return state;
	}
};
