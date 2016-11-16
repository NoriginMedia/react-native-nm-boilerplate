import {absoluteFlex} from "../../shared/styles/layout";
import {screenHeight, screenWidth} from "../utils/screen";

/* eslint-disable import/prefer-default-export */

const getZIndexedStyle = (isForeground) => ({
	...absoluteFlex,
	zIndex: isForeground ? 2 : 1
});

export const floatFromBottom = (fader, isForeground) => ({
	...getZIndexedStyle(isForeground),
	backgroundColor: "white",
	transform: [
		{
			translateY: screenHeight - (fader * (screenHeight / 100))
		}
	]
});

export const floatFromTop = (fader, isForeground) => ({
	...getZIndexedStyle(isForeground),
	backgroundColor: "white",
	transform: [
		{
			translateY: (fader * (screenHeight / 100)) - screenHeight
		}
	]
});

export const floatFromRight = (fader, isForeground) => ({
	...getZIndexedStyle(isForeground),
	backgroundColor: "white",
	transform: [
		{
			translateX: screenWidth - (fader * (screenWidth / 100))
		}
	]
});

export const staticBackground = getZIndexedStyle(false);
export const staticForeground = getZIndexedStyle(true);
