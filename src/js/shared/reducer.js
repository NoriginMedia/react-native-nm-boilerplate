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
				encrypted_username: action.payload.encrypted_username,
				encrypted_password: action.payload.encrypted_password
			});

		case ACTION_TYPES.LOGOUT:
			return Object.assign({}, state, {
				fullyAuthenticated: false,
				username: "",
				password: ""
			});

		case ACTION_TYPES.FETCH_PROGRAM_DETAILS_SUCCESS: {
			const details = action.payload.details && action.payload.details[0];
			const {id} = details;

			return Object.assign({}, state, {
				programs: {
					...state.programs,
					[id]: details
				}
			});
		}

		case ACTION_TYPES.FETCH_CHANNEL_STREAM_REQUEST:
			return Object.assign({}, state, {
				channelStreamUrl: ""
			});

		case ACTION_TYPES.FETCH_CHANNEL_STREAM_SUCCESS:
			return Object.assign({}, state, {
				channelStreamUrl: action.payload.channelStreamUrl
			});

		case ACTION_TYPES.FETCH_MOVIE_DETAILS_SUCCESS: {
			const details = action.payload.details && action.payload.details[0];
			const {id, type} = details;

			return Object.assign({}, state, {
				movies: {
					...state.movies,
					[type]: {
						...state.movies[type],
						[id]: details
					}
				}
			});
		}

		default:
			return state;
	}
}

export default appReducer;
