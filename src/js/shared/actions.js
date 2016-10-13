import {get, setAuthToken} from "./services/api";
import {APP_ID, APP_VERSION} from "./config";

/* eslint-disable import/prefer-default-export */

export const ACTION_TYPES = {
	AUTH_ANONYMOUSLY_REQUEST: "AUTH_ANONYMOUSLY_REQUEST",
	AUTH_ANONYMOUSLY_SUCCESS: "AUTH_ANONYMOUSLY_SUCCESS",
	AUTH_ANONYMOUSLY_FAILURE: "AUTH_ANONYMOUSLY_FAILURE"
};

const ENDPOINTS = {
	AUTH: "teracom-se/anonymous"
};

/* AUTH ANONYMOUSLY */
const authAnonymouslySuccess = (sessionId) => {
	setAuthToken(sessionId);

	return {
		type: ACTION_TYPES.AUTH_ANONYMOUSLY_SUCCESS,
		payload: {
			sessionId
		}
	};
};

const authAnonymouslyFailure = (error) => ({
	type: ACTION_TYPES.AUTH_ANONYMOUSLY_FAILURE,
	payload: {
		error
	}
});

export const authAnonymously = () => (dispatch) => {
	dispatch({
		type: ACTION_TYPES.AUTH_ANONYMOUSLY_REQUEST
	});

	const params = {
		appId: APP_ID,
		appVersion: APP_VERSION
	};

	return get(ENDPOINTS.AUTH, params)
		.then(({sessionId}) => dispatch(authAnonymouslySuccess(sessionId)))
		.catch((error) => dispatch(authAnonymouslyFailure(error)));
};

/* AUTH ANONYMOUSLY */
