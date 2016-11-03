import React from "react";
import {View, Text, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1
	}
});

const Movies = () => <View style={styles.container}>
	<TopBar />
	<View style={styles.content}>
		<Text>{"Movies"}</Text>
	</View>
	<BottomBar />
</View>;

export default Movies;
