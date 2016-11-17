import React, {PropTypes} from "react";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const getStore = (composer) => {
	// Return composer or dummy function
	const composeEnchancers = composer || ((middlewares) => middlewares);

	return createStore(reducer, composeEnchancers(applyMiddleware(thunk)));
};

const Store = (props) => <Provider store={getStore(props.composer)}>{props.children}</Provider>;

Store.propTypes = {
	composer: PropTypes.func
};

export default Store;
