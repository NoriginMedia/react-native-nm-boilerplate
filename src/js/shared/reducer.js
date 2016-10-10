import initialState from "./initial-state";
import {ACTION_TYPES} from "./actions";

function appReducer(state = initialState, action) {
	switch (action.type) {
		case ACTION_TYPES.AUTH_ANONYMOUSLY:
			return Object.assign({}, state, {
				authenticatedAnonymously: true
			});

		default:
			return state;
	}
}

export default appReducer;
