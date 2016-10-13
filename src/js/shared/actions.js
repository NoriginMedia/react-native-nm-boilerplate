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
	ERROR: "ERROR"
};

const ENDPOINTS = {
	AUTH: "teracom-se/anonymous",
	TAG: "tag",
	EPG: "epg"
};

const ENDPOINT_DEFAULT_PARAMS = {
	EPG: {
		from: "now",
		offset: "-1h",
		duration: "16h",
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
		byFamilyLink: "home"
	};

	return get(ENDPOINTS.TAG, params)
		.then((categories) => dispatch(fetchCategoriesSuccess(categories)))
		.catch((error) => dispatch(generalError(ACTION_TYPES.FETCH_CATEGORIES_REQUEST, error)));
};

/* FETCH CATEGORIES */
