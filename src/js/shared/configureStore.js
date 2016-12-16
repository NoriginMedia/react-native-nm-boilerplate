import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import reducer from "../shared/reducer";
import initialState from "../shared/initial-state";

export default (composer) => {
	// Return Redux devtools composer or dummy function
	const composeEnchancers = composer || ((middlewares) => middlewares);
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
