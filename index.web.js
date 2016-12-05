import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import WebApp from "./src/js/web/app";
import configureStore from "./src/js/web/configureStore";

window.addEventListener("load", () => {
	const store = configureStore();

	document.body.style.margin = 0;
	const rootNode = document.createElement("div");

	document.body.appendChild(rootNode);

	ReactDOM.render(<AppContainer><WebApp store={store} /></AppContainer>, rootNode);

	if (module.hot) {
		module.hot.accept("./src/js/web/app", () => {
			/* eslint-disable global-require */
			const NewWebApp = require("./src/js/web/app").default;

			ReactDOM.render(<AppContainer><NewWebApp store={store} /></AppContainer>, rootNode);
		});
	}
});
