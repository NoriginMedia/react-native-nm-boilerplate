import React, {PropTypes} from "react";
import {View, Text, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import {screenHeight} from "../utils/screen";
import {absoluteFlex} from "../../shared/styles/layout";
import {floatFromBottom} from "../styles/animations";

const styles = StyleSheet.create({
	content: {
		flex: 1
	}
});

const getFadingStyle = ({fader, fadingIn, fadingOut}) => {
	let fadingStyle = {
		flex: 1
	};

	if (fadingIn) {
		fadingStyle = {
			zIndex: 2,
			...absoluteFlex,
			...floatFromBottom(fader, screenHeight)
		};
	} else if (fadingOut) {
		fadingStyle = {
			zIndex: 1,
			...absoluteFlex
		};
	}

	return fadingStyle;
};

const ProgramGuide = (props) => <View
	style={{
		...getFadingStyle(props)
	}}
	accessibilityLabel={"EPG"}
>
	<TopBar />
	<View style={styles.content}>
		<Text style={styles.content}>{"EPG"}</Text>
	</View>
	<BottomBar />
</View>;

ProgramGuide.propTypes = {
	fader: PropTypes.number.isRequired,
	fadingIn: PropTypes.bool.isRequired,
	fadingOut: PropTypes.bool.isRequired
};

export default ProgramGuide;
