import React from "react";
import Contacts from "../contacts/Contacts";
import ContactFilter from "../contacts/ContactFilter";
import AllContacts from "../contacts/AllContacts";
import SearchContacts from "../contacts/SearchContacts";
const Home = () => {
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
