import initialState from "./initial-state";
import {ACTION_TYPES} from "./actions";

function appReducer(state = initialState, action) {
	switch (action.type) {
		case ACTION_TYPES.TEST_ACTION:
			return Object.assign({}, state, {
				test: action.payload.test
			});

		default:
			return state;
	}
}

export default appReducer;
