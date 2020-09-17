import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactFilter from "../contacts/ContactFilter";
import AllContacts from "../contacts/AllContacts";
import SearchContacts from "../contacts/SearchContacts";
import AuthContext from "../../context/auth/AuthContext";
const Home = () => {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		//this allows us to refresh the page and still be authenticated
		authContext.loadUser();
		//eslint-disable-next-line
	}, []);
	return (
		<div className="grid-2">
			<div>
				<h1>All Contacts</h1>
				<SearchContacts />

				<AllContacts />
			</div>
			<div>
				<h1>Your Contacts</h1>
				<ContactFilter />

				<Contacts />
			</div>
		</div>
	);
};

export default Home;
