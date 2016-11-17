import React from "react";
import {View, Text, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";

const styles = StyleSheet.create({
	content: {
		flex: 1
	}
});

const ProgramGuide = () => <View style={styles.content}>
	<TopBar />
	<View style={styles.content}>
		<Text style={styles.content}>{"EPG"}</Text>
	</View>
	<BottomBarContainer component={BottomBar} />
</View>;

export default ProgramGuide;
