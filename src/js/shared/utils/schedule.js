import {each, isArray} from "lodash";
import {getCurrentTimestamp} from "./time";

/* eslint-disable import/prefer-default-export */
export const pickCurrentProgram = (programs) => {
	let currentProgram = null;

	if (!isArray(programs)) {
		return null;
	}

	each(programs, (program) => {
		if (program.start &&
			program.start <= getCurrentTimestamp() &&
			program.end &&
			program.end >= getCurrentTimestamp()) {
			currentProgram = program;
		}
	});

	return currentProgram;
};
