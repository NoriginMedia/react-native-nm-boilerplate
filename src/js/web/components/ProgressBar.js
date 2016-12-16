import React, {PropTypes} from "react";
import {View} from "react-native";
import colors from "../../shared/styles/colors";

const styles = {
	background: {
		flexDirection: "row"
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

const ProgressBar = (props) => <View style={styles.background}>
	<View style={[styles.progress, {flex: Math.max(props.percent, 0)}]} />
	<View style={[styles.negativeProgress, {flex: Math.max(100 - props.percent, 0)}]} />
</View>;

ProgressBar.propTypes = {
	percent: PropTypes.number.isRequired
};

export default ProgressBar;
