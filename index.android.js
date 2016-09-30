import React from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from "react-native";
import text from "./src/js/shared/module";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	}
});

const reactNativeNmBoilerplate = () =>
	<View style={styles.container}>
		<Text style={styles.welcome}>
			{text}
		</Text>
	</View>;

AppRegistry.registerComponent("reactNativeNmBoilerplate", () => reactNativeNmBoilerplate);
