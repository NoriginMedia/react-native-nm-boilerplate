import text from "./src/js/shared/module";

window.addEventListener("load", () => {
	const rootNode = document.createElement("div");

	rootNode.innerHTML = text;

	document.body.appendChild(rootNode);
});
