import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import reducer from "../shared/reducer";
import initialState from "../shared/initial-state";

export default () => {
	// Return browser Redux composer or dummy function
	// https://github.com/zalmoxisus/redux-devtools-extension

	/* eslint-disable no-underscore-dangle */
	const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || ((middlewares) => middlewares);
	const store = createStore(reducer, initialState, composeEnchancers(applyMiddleware(thunk)));

	if (module.hot) {
		module.hot.accept("../shared/reducer", () => {
			/* eslint-disable global-require */
			const newReducer = require("../shared/reducer").default;

			store.replaceReducer(newReducer);
		});
	}

	return store;
};
