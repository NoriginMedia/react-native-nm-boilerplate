/* eslint-disable import/prefer-default-export */

export const ACTION_TYPES = {
	AUTH_ANONYMOUSLY: "AUTH_ANONYMOUSLY"
};

export const authAnonymously = () => ({
	type: ACTION_TYPES.AUTH_ANONYMOUSLY
});
