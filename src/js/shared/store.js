import React from "react";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

/* global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ */
const getStore = () => {
	// Return composer or dummy function
	const composeEnchancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || ((middlewares) => middlewares);

	return createStore(reducer, composeEnchancers(applyMiddleware(thunk)));
};

export default (props) => <Provider store={getStore()}>{props.children}</Provider>;
