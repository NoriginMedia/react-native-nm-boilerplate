import React, {PropTypes} from "react";
import {View, Text, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import {staticBackground} from "../styles/animations";

const styles = StyleSheet.create({
	content: {
		flex: 1
	}
});

const WatchLive = (props) => <View style={props.isAnimating ? staticBackground : {flex: 1}}>
	<TopBar />
	<View style={styles.content}>
		<Text style={styles.content}>{"Watch Live!"}</Text>
	</View>
	<BottomBar fullyAuthenticated={props.fullyAuthenticated} />
</View>;

WatchLive.propTypes = {
	isAnimating: PropTypes.bool.isRequired,
	fullyAuthenticated: PropTypes.bool.isRequired
};

export default WatchLive;
