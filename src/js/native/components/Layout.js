import React from "react";
import {View, StatusBar, StyleSheet} from "react-native";
import createRoutes from "../../shared/createRoutes";
import routes from "../routes";
import TopBar from "./TopBar";
import colors from "../../shared/style/colors";

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	content: {}
});

const Layout = () => <View style={styles.root}>
	<StatusBar
		barStyle={"light-content"}
		backgroundColor={colors.darkBlue}
	/>
	<View style={styles.content}>
		<TopBar />
		{createRoutes(routes)}
	</View>
</View>;

export default Layout;
