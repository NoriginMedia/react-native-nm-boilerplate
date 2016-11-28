import moment from "moment";

/* eslint-disable import/prefer-default-export */
export const MILISECONDS_IN_HOUR = 60 * 60 * 1000;

export const getCurrentTimestamp = () => moment().valueOf();

export const timestampToTimeString = (timestamp) => moment(timestamp).format("HH:mm");

export const timestampToDayString = (timestamp) => moment(timestamp).format("D MMM");

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

export const hourIntervalsBetween = (start, end) => Math.ceil(Math.max((end - start), 0) / MILISECONDS_IN_HOUR);

export const timeAfterHours = (current, hours) => moment(current).add(hours, "hours").valueOf();

export const timeIntervalWidthPerHour = (start, end, oneHourWidth) => Math.round(
	(Math.max((end - start), 0) * oneHourWidth) / MILISECONDS_IN_HOUR);
