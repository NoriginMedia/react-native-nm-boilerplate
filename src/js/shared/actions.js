/* eslint-disable import/prefer-default-export */

export const ACTION_TYPES = {
	TEST_ACTION: "TEST_ACTION"
};

export const testAction = () => ({
	type: ACTION_TYPES.TEST_ACTION,
	payload: {test: "Text"}
});
