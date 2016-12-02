import {absoluteFlex} from "../../shared/styles/layout";
import {screenHeight, screenWidth} from "../utils/screen";
import colors from "../../shared/styles/colors";

/* eslint-disable import/prefer-default-export */

const getZIndexedStyle = (isForeground) => ({
	...absoluteFlex,
	zIndex: isForeground ? 2 : 1
});

export const floatFromBottom = (fader, isForeground) => ({
	...getZIndexedStyle(isForeground),
	backgroundColor: colors.background,
	transform: [
		{
			translateY: screenHeight - (fader * (screenHeight / 100))
		}
	]
});

export const floatFromTop = (fader, isForeground) => ({
	...getZIndexedStyle(isForeground),
	backgroundColor: colors.background,
	transform: [
		{
			translateY: (fader * (screenHeight / 100)) - screenHeight
		}
	]
});

export const floatFromRight = (fader, isForeground) => ({
	...getZIndexedStyle(isForeground),
	backgroundColor: colors.background,
	transform: [
		{
			translateX: screenWidth - (fader * (screenWidth / 100))
		}
	]
});

export const staticBackground = getZIndexedStyle(false);
export const staticForeground = getZIndexedStyle(true);
