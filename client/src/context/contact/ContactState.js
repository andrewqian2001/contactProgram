import React, { useReducer } from "react";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import axios from "axios";
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER_CONTACT,
	SEARCH_CONTACT,
	CLEAR_SEARCH,
	CONTACT_ERROR,
	GET_ALL_CONTACTS,
	GET_CONTACTS,
	CLEAR_ALL_CONTACTS,
	CLEAR_CONTACT,
} from "../types";

const ContactState = (props) => {
	//We want the contact data and functions avalible for the rest of our program so we store anything to do with contacts in this state

	const initialState = {
		contacts: [
			//list of contacts that the logged in user has
		],
		AllContacts: null,
		filteredContacts: null, //used for when searching for users in contacts
		searchedContacts: null, //used for when searching for all users in database
		error: null,
	};
	const [state, dispatch] = useReducer(ContactReducer, initialState);

	//Get contacts from DB
	const getContacts = async () => {
		try {
			const res = await axios.get("/api/contacts");
			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	//Get all contacts from DB
	const getAllContacts = async () => {
		try {
			const res = await axios.get("/api/users");
			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Adds a contact to the list of contacts that the logged in user has
	const addContact = async (contact) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post("/api/contacts", contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	//Delete contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	// Filter the list of contacts that logged in user has contact list
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACT, payload: text });
	};

	//Clear filter
	const clearFilterContact = () => {
		dispatch({ type: CLEAR_FILTER_CONTACT });
	};

	//Search all contacts
	const searchContacts = (text) => {
		dispatch({ type: SEARCH_CONTACT, payload: text });
	};

	//Clear Search
	const clearSearch = () => {
		dispatch({ type: CLEAR_SEARCH });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				addContact,
				deleteContact,
				filteredContacts: state.filteredContacts,
				filterContacts,
				clearFilterContact,
				allContacts: state.AllContacts,
				searchContacts,
				searchedContacts: state.searchedContacts,
				clearSearch,
				error: state.error,
				getContacts,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
