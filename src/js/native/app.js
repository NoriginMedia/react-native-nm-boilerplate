import React from "react";
import {View, StatusBar, StyleSheet} from "react-native";
import {MemoryRouter} from "react-router";
import Store from "../shared/store";
import createRoutes from "../shared/createRoutes";
import routes from "./routes";
import TopBar from "./components/TopBar";
import colors from "../shared/style/colors";

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	content: {}
});

export default () => <Store>
	<MemoryRouter>
		<View style={styles.root}>
			<StatusBar
				barStyle={"light-content"}
				backgroundColor={colors.darkBlue}
			/>
			<View style={styles.content}>
				<TopBar />
				{createRoutes(routes)}
			</View>
		</View>
	</MemoryRouter>
</Store>;
