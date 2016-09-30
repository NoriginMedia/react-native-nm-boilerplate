import ReactDOM from "react-dom";
import WebApp from "./src/js/web/app";

window.addEventListener("load", () => {
	const rootNode = document.createElement("div");

	document.body.appendChild(rootNode);

	ReactDOM.render(WebApp, rootNode);
});
