import React, {PropTypes} from "react";
import {View, Text, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import {floatFromRight} from "../styles/animations";

const styles = StyleSheet.create({
	content: {
		flex: 1
	}
});

const DetailsProgram = (props) => <View
	style={
		props.isAnimating ?
			floatFromRight(props.fader, true) :
			{flex: 1}
	}
>
	<TopBar leftButtonReferer={"details"} />
	<View style={styles.content}>
		<Text style={styles.content}>{"Details"}</Text>
	</View>
	<BottomBar fullyAuthenticated={props.fullyAuthenticated} />
</View>;

DetailsProgram.propTypes = {
	fader: PropTypes.number.isRequired,
	isAnimating: PropTypes.bool.isRequired,
	fullyAuthenticated: PropTypes.bool.isRequired
};

export default DetailsProgram;
