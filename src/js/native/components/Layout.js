import React from "react";
import {View, StatusBar, StyleSheet} from "react-native";
import createRoutes from "../../shared/createRoutes";
import routes from "../routes";
import colors from "../../shared/styles/colors";

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	content: {
		flex: 1
	}
});

const Layout = () => <View style={styles.root}>
	<StatusBar
		barStyle={"light-content"}
		backgroundColor={colors.darkBlue}
	/>
	<View style={styles.content}>
		{createRoutes(routes)}
	</View>
</View>;

export default Layout;
