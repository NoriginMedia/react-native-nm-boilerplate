import React, {PropTypes} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Link} from "react-router";
import colors from "../../shared/styles/colors";
import {isIos} from "../utils/platform";

const styles = StyleSheet.create({
	topBar: {
		backgroundColor: colors.primary,
		paddingTop: isIos() ? 30 : 0,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	topBarTitle: {
		flex: 1
	},
	topBarButton: {
		flex: 1
	},
	topBarTitleText: {
		textAlign: "center",
		color: colors.accent
	},
	topBarLeftButtonText: {
		textAlign: "left",
		color: colors.accent
	}
});

const TopBar = (props) => <View style={styles.topBar}>
	<View style={styles.topBarButton}>
		{(props.leftButtonPath || props.leftButtonReferer) ? <Link
			to={{
				pathname: props.leftButtonPath || "/",
				state: {from: props.leftButtonReferer}
			}}
		>{
			({transition}) => <TouchableOpacity
				onPress={transition}
			>
				<Text style={styles.topBarLeftButtonText}>{"< Back"}</Text>
			</TouchableOpacity>
		}</Link> : null}
	</View>
	<View style={styles.topBarTitle}>
		<Text style={styles.topBarTitleText}>{"NM"}</Text>
	</View>
	<View style={styles.topBarButton}>
		{null}
	</View>
</View>;

TopBar.propTypes = {
	leftButtonPath: PropTypes.string,
	leftButtonReferer: PropTypes.string
};

export default TopBar;
