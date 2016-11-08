/* eslint-disable import/prefer-default-export */

export const floatFromBottom = (fader, screenHeight) => ({
	backgroundColor: "white",
	transform: [
		{
			translateY: screenHeight - (fader * (screenHeight / 100))
		}
	]
});

export const floatFromRight = (fader, screenWidth) => ({
	backgroundColor: "white",
	transform: [
		{
			translateX: screenWidth - (fader * (screenWidth / 100))
		}
	]
});
