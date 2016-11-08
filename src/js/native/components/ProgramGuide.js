import React, {PropTypes} from "react";
import {View, Text, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import createTransition from "../../shared/Transition";
import {screenHeight} from "../utils/screen";
import {absoluteFlex} from "../../shared/styles/layout";
import {floatFromBottom} from "../styles/animations";

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1
	}
});

const ProgramGuide = (props) => {
	let fadingStyle = {};

	if (props.fadingIn) {
		fadingStyle = {
			zIndex: 2,
			...floatFromBottom(props.fader, screenHeight)
		};
	} else if (props.fadingOut) {
		fadingStyle = {
			zIndex: 1
		};
	}

	return (<View
		style={{
			...absoluteFlex,
			...fadingStyle
		}}
	>
		<TopBar />
		<View style={styles.content}>
			<Text style={styles.content}>{"EPG"}</Text>
		</View>
		<BottomBar />
	</View>);
};

ProgramGuide.propTypes = {
	fader: PropTypes.number.isRequired,
	fadingIn: PropTypes.bool.isRequired,
	fadingOut: PropTypes.bool.isRequired
};

export default createTransition(ProgramGuide);
