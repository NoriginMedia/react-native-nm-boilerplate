import initialState from "./initial-state";
import {ACTION_TYPES} from "./actions";

function appReducer(state = initialState, action) {
	switch (action.type) {
		case ACTION_TYPES.AUTH_ANONYMOUSLY_SUCCESS:
			return Object.assign({}, state, {
				authenticatedAnonymously: true,
				sessionId: action.payload.sessionId
			});

		case ACTION_TYPES.FETCH_SLIDES_SUCCESS:
			return Object.assign({}, state, {
				slides: action.payload.slides
			});

		case ACTION_TYPES.FETCH_CHANNELS_SUCCESS:
			return Object.assign({}, state, {
				channels: action.payload.channels
			});

		case ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return Object.assign({}, state, {
				categories: action.payload.categories
			});

		case ACTION_TYPES.LOGIN_SUCCESS:
			return Object.assign({}, state, {
				fullyAuthenticated: true,
				sessionId: action.payload.sessionId,
				username: action.payload.encrypted_username,
				password: action.payload.encrypted_password,
			});

		default:
			return state;
	}
}

export default appReducer;
