import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {each, forOwn} from "lodash";
import materialIcons from "react-native-vector-icons/Fonts/MaterialIcons.ttf";
import WebApp from "./src/js/web/app";
import configureStore from "./src/js/shared/configureStore";
import {fullScreen} from "./src/js/web/styles/layout";

const includeMaterialIconsFont = () => {
	const iconsFontStyle = `@font-face {src:url("${materialIcons}");font-family:Material-Icons;}`;
	const style = document.createElement("style");

	style.type = "text/css";
	if (style.styleSheet) {
		style.styleSheet.cssText = iconsFontStyle;
	} else {
		style.appendChild(document.createTextNode(iconsFontStyle));
	}

	document.head.appendChild(style);
};

window.addEventListener("load", () => {
	includeMaterialIconsFont();

	const rootNode = document.createElement("div");

	document.body.appendChild(rootNode);

	each([document.documentElement, document.body, rootNode], (element) => {
		forOwn(fullScreen, (style, property) => {
			element.style[property] = style;
		});
	});

	/* eslint-disable no-underscore-dangle */
	// https://github.com/zalmoxisus/redux-devtools-extension
	const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
	const store = configureStore(composer);

	ReactDOM.render(<AppContainer><WebApp store={store} /></AppContainer>, rootNode);

	if (module.hot) {
		module.hot.accept("./src/js/web/app", () => {
			/* eslint-disable global-require */
			const NewWebApp = require("./src/js/web/app").default;

			ReactDOM.render(<AppContainer><NewWebApp store={store} /></AppContainer>, rootNode);
		});
	}
});
