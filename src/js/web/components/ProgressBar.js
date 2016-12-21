import React, {PropTypes} from "react";
import colors from "../../shared/styles/colors";
import {horizontalFlex} from "../styles/layout";

const styles = {
	background: {
		...horizontalFlex
	},
	progress: {
		backgroundColor: colors.accent,
		height: 3
	},
	negativeProgress: {
		backgroundColor: colors.secondary,
		height: 3
	}
};

const ProgressBar = (props) => <div style={styles.background}>
	<div
		style={{
			...styles.progress,
			flex: Math.max(props.percent, 0)
		}}
	/>
	<div
		style={{
			...styles.negativeProgress,
			flex: Math.max(100 - props.percent, 0)
		}}
	/>
</div>;

ProgressBar.propTypes = {
	percent: PropTypes.number.isRequired
};

export default ProgressBar;
