import React, {PropTypes} from "react";
import {View, Text, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

const styles = StyleSheet.create({
	content: {
		flex: 1
	}
});

const ProgramGuide = (props) => <View style={styles.content}>
	<TopBar />
	<View style={styles.content}>
		<Text style={styles.content}>{"EPG"}</Text>
	</View>
	<BottomBar fullyAuthenticated={props.fullyAuthenticated} />
</View>;

ProgramGuide.propTypes = {
	fullyAuthenticated: PropTypes.bool.isRequired
};

export default ProgramGuide;
