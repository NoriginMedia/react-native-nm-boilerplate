import moment from "moment";

/* eslint-disable import/prefer-default-export */
export const getCurrentTimestamp = () => moment().valueOf();

export const timestampToTimeString = (timestamp) => moment(timestamp).format("HH:mm");

export const timePercentElapsedBetween = (start, end) => {
	if (isNaN(start) || isNaN(end)) {
		return 0;
	}

	const duration = end - start;
	const currentPosition = getCurrentTimestamp() - start;

	if (duration < 0 || currentPosition < 0) {
		return 0;
	}

	return Math.floor((currentPosition * 100) / duration);
};
