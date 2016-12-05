import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import reducer from "../shared/reducer";
import initialState from "../shared/initial-state";

export default () => {
	// Return standalone React Native Debugger composer or dummy function
	// https://github.com/jhen0409/react-native-debugger

	/* eslint-disable no-underscore-dangle */
	const composeEnchancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || ((middlewares) => middlewares);

	return createStore(reducer, initialState, composeEnchancers(applyMiddleware(thunk)));
};
