import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
	const initialState = [];

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	//Set Alert
	const setAlert = (msg, type) => {
		//msg is the message that will be outputted, type is just for css

		const id = uuidv4(); //id is so that we know which alert to remove
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id },
		});

		setTimeout(() => {
			dispatch({ type: REMOVE_ALERT, payload: id });
		}, 5000);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
