import {get, setAuthToken} from "./services/api";
import {APP_ID, APP_VERSION} from "./config";

/* eslint-disable import/prefer-default-export */

export const ACTION_TYPES = {
	AUTH_ANONYMOUSLY_REQUEST: "AUTH_ANONYMOUSLY_REQUEST",
	AUTH_ANONYMOUSLY_SUCCESS: "AUTH_ANONYMOUSLY_SUCCESS",
	FETCH_SLIDES_REQUEST: "FETCH_SLIDES_REQUEST",
	FETCH_SLIDES_SUCCESS: "FETCH_SLIDES_SUCCESS",
	FETCH_CHANNELS_REQUEST: "FETCH_CHANNELS_REQUEST",
	FETCH_CHANNELS_SUCCESS: "FETCH_CHANNELS_SUCCESS",
	FETCH_CATEGORIES_REQUEST: "FETCH_CATEGORIES_REQUEST",
	FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
	ERROR: "ERROR",
	LOGIN_REQUEST: "LOGIN_REQUEST",
	LOGIN_SUCCESS: "LOGIN_SUCCESS",
	LOGIN_FAILURE: "LOGIN_FAILURE",
	LOGOUT: "LOGOUT",
	FETCH_PROGRAM_DETAILS_REQUEST: "FETCH_PROGRAM_DETAILS_REQUEST",
	FETCH_PROGRAM_DETAILS_SUCCESS: "FETCH_PROGRAM_DETAILS_SUCCESS",
	FETCH_CHANNEL_STREAM_REQUEST: "FETCH_CHANNEL_STREAM_REQUEST",
	FETCH_CHANNEL_STREAM_SUCCESS: "FETCH_CHANNEL_STREAM_SUCCESS"
};

const ENDPOINTS = {
	AUTH: "orange-es/anonymous",
	FULL_AUTH: "orange-es/authenticate",
	TAG: "tag",
	EPG: "epg"
};

const ENDPOINT_DEFAULT_PARAMS = {
	EPG: {
		from: "now",
		offset: "-3h",
		duration: "20h",
		transform: "epg"
	},
	TAG: {
		resolveLinks: true,
		depth: 2,
		limitContent: 18
	}
};

/* GENERAL ERROR */
const generalError = (actionName, error) => ({
	type: ACTION_TYPES.ERROR,
	payload: {
		actionName,
		error
	}
});

/* GENERAL ERROR */

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
		.catch((error) => dispatch(generalError(ACTION_TYPES.AUTH_ANONYMOUSLY_REQUEST, error)));
};

/* AUTH ANONYMOUSLY */

/* FETCH SLIDES */
const fetchSlidesSuccess = (slides) => ({
	type: ACTION_TYPES.FETCH_SLIDES_SUCCESS,
	payload: {
		slides
	}
});

export const fetchSlides = () => (dispatch) => {
	dispatch({
		type: ACTION_TYPES.FETCH_SLIDES_REQUEST
	});

	const params = ENDPOINT_DEFAULT_PARAMS.TAG;

	return get(`${ENDPOINTS.TAG}/Slideshow@slideshow`, params)
		.then((slides) => dispatch(fetchSlidesSuccess(slides)))
		.catch((error) => dispatch(generalError(ACTION_TYPES.FETCH_SLIDES_REQUEST, error)));
};

/* FETCH SLIDES */

/* FETCH CHANNELS */
const fetchChannelsSuccess = (channels) => ({
	type: ACTION_TYPES.FETCH_CHANNELS_SUCCESS,
	payload: {
		channels
	}
});

export const fetchChannels = () => (dispatch) => {
	dispatch({
		type: ACTION_TYPES.FETCH_CHANNELS_REQUEST
	});

	const params = ENDPOINT_DEFAULT_PARAMS.EPG;

	return get(ENDPOINTS.EPG, params)
		.then((channels) => dispatch(fetchChannelsSuccess(channels)))
		.catch((error) => dispatch(generalError(ACTION_TYPES.FETCH_CHANNELS_REQUEST, error)));
};

/* FETCH CHANNELS */

/* FETCH CATEGORIES */
const fetchCategoriesSuccess = (categories) => ({
	type: ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	payload: {
		categories
	}
});

export const fetchCategories = () => (dispatch) => {
	dispatch({
		type: ACTION_TYPES.FETCH_CATEGORIES_REQUEST
	});

	const params = {
		...ENDPOINT_DEFAULT_PARAMS.TAG,
		byFamilyLink: "svodCategories"
	};

	return get(ENDPOINTS.TAG, params)
		.then((categories) => dispatch(fetchCategoriesSuccess(categories)))
		.catch((error) => dispatch(generalError(ACTION_TYPES.FETCH_CATEGORIES_REQUEST, error)));
};

/* FETCH CATEGORIES */

/* LOGIN */
const loginSuccess = ({sessionId, credentials}) => {
	setAuthToken(sessionId);

	return {
		type: ACTION_TYPES.LOGIN_SUCCESS,
		payload: {
			sessionId,
			...credentials
		}
	};
};

const loginFailure = (error) => ({
	type: ACTION_TYPES.LOGIN_FAILURE,
	payload: {
		error
	}
});

export const login = (credentials) => (dispatch) => {
	dispatch({
		type: ACTION_TYPES.LOGIN_REQUEST
	});

	const params = {
		appId: APP_ID,
		appVersion: APP_VERSION,
		deviceIdentifier: "demo-test-device",
		...credentials
	};

	return get(ENDPOINTS.FULL_AUTH, params)
		.then((response) => dispatch(loginSuccess(response)))
		.catch((error) => dispatch(loginFailure(error)));
};

/* LOGIN */

/* LOGOUT */
export const logout = () => ({
	type: ACTION_TYPES.LOGOUT
});

/* LOGOUT */

/* FETCH PROGRAM DETAILS */
/* eslint-disable id-length */
const fetchProgramDetailsSuccess = (details) => ({
	type: ACTION_TYPES.FETCH_PROGRAM_DETAILS_SUCCESS,
	payload: {
		details
	}
});

export const fetchProgramDetails = (channelId, programId) => (dispatch) => {
	dispatch({
		type: ACTION_TYPES.FETCH_PROGRAM_DETAILS_REQUEST
	});

	return get(`channel/${channelId}/program/${programId}`)
		.then((details) => dispatch(fetchProgramDetailsSuccess(details)))
		.catch((error) => dispatch(generalError(ACTION_TYPES.FETCH_PROGRAM_DETAILS_REQUEST, error)));
};

/* FETCH PROGRAM DETAILS */

/* FETCH CHANNEL STREAM */
const fetchChannelStreamSuccess = (channelStreamUrl) => ({
	type: ACTION_TYPES.FETCH_CHANNEL_STREAM_SUCCESS,
	payload: {
		channelStreamUrl
	}
});

export const fetchChannelStream = (channelId) => (dispatch) => {
	dispatch({
		type: ACTION_TYPES.FETCH_CHANNEL_STREAM_REQUEST
	});

	return get(`channel/${channelId}/stream`)
		.then((channelStreamUrl) => dispatch(fetchChannelStreamSuccess(channelStreamUrl)))
		.catch((error) => dispatch(generalError(ACTION_TYPES.FETCH_CHANNEL_STREAM_REQUEST, error)));
};

/* FETCH CHANNEL STREAM */
