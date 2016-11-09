import React, {PropTypes} from "react";
import {View, Text, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import createTransition from "../../shared/components/Transition";
import {screenHeight, screenWidth} from "../utils/screen";
import {absoluteFlex} from "../../shared/styles/layout";
import {floatFromBottom, floatFromRight} from "../styles/animations";

const styles = StyleSheet.create({
	content: {
		flex: 1
	}
});

const getFadingStyle = ({fader, fadingIn, fadingOut, location}) => {
	let fadingStyle = {};

	if (fadingIn) {
		const floatAnimation = location.state.from === "home" ?
			floatFromRight(fader, screenWidth) :
			floatFromBottom(fader, screenHeight);

		fadingStyle = {
			zIndex: 2,
			...floatAnimation
		};
	} else if (fadingOut) {
		fadingStyle = {
			zIndex: 1
		};
	}

	return fadingStyle;
};

const WatchLive = (props) => <View
	style={{
		...absoluteFlex,
		...getFadingStyle(props)
	}}
>
	<TopBar />
	<View style={styles.content}>
		<Text style={styles.content}>{"Watch Live!"}</Text>
	</View>
	<BottomBar />
</View>;

WatchLive.propTypes = {
	fader: PropTypes.number.isRequired,
	fadingIn: PropTypes.bool.isRequired,
	fadingOut: PropTypes.bool.isRequired,
	location: PropTypes.shape({
		state: PropTypes.shape({
			from: PropTypes.string
		})
	})
};

export default createTransition(WatchLive);
