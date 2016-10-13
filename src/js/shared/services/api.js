import "whatwg-fetch";
import queryString from "query-string";
import {API_ROOT, AUTH_TOKEN_NAME} from "../config";

const METHOD_GET = "GET";
const METHOD_POST = "POST";

// TODO: Store this in local storage. It's different for web and native
let authToken = null;

const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);

	error.response = response;
	throw error;
};

const doRequest = (endpoint, options) => {
	if (authToken !== null) {
		if (!options.headers) {
			options.headers = {};
		}

		options.headers[AUTH_TOKEN_NAME] = authToken;
	}

	return fetch(endpoint, options)
		.then(checkStatus)
		.then((response) => response.json());
};

// eslint-disable import/prefer-default-export

export const setAuthToken = (token) => {
	authToken = token;
};

export const get = (endpoint, params) => {
	const path = API_ROOT + endpoint + (params ? `?${queryString.stringify(params)}` : "");

	return doRequest(path, {method: METHOD_GET});
};

export const post = (endpoint, params) => {
	const path = API_ROOT + endpoint;

	const options = {
		method: METHOD_POST,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(params)
	};

	return doRequest(path, options);
};
