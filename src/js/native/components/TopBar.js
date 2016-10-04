import React from "react";
import {View, Text, StyleSheet} from "react-native";
import colors from "../../shared/style/colors";
import {isIos} from "../utils/platform";

const styles = StyleSheet.create({
	topBar: {
		backgroundColor: colors.darkBlue,
		paddingTop: isIos() ? 30 : 0,
		paddingBottom: 10,
		flexDirection: "row"
	},
	topBarText: {
		color: "white",
		flex: 1,
		textAlign: "center"
	}
});

const TopBar = () => <View style={styles.topBar}>
	<Text style={styles.topBarText}>{"top bar"}</Text>
</View>;

export default TopBar;
