import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About.js";

const App = () => {
	/*
		Notes:
		- wrapping Router around the other components mades it avalible to them
		- https://reactrouter.com/core/api/Switch
		- Route renders the component when the route matches the path, the route usually matches the path through link tags which redirects the url
	*/
	return (
		<Router>
			<Fragment className="App">
				<Navbar />
				<div className="container">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/about" component={About} />
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
};

export default App;