import React, {PropTypes} from "react";
import {View, Text, StyleSheet} from "react-native";
/* eslint-disable */
import Video from "react-native-video";
/* eslint-enable */
import {isEmpty} from "lodash";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";
import {staticBackground} from "../styles/animations";
import colors from "../../shared/styles/colors";
import {screenWidth} from "../utils/screen";
import {DUMMY_STREAM_URL} from "../../shared/config";

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: colors.background
	},
	playerWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around"
	},
	playerText: {
		color: "white"
	},
	player: {
		height: 300,
		width: screenWidth
	}
});

const WatchLive = (props) => <View style={props.isAnimating ? staticBackground : {flex: 1}}>
	<TopBar />
	<View style={styles.content}>
		<View style={styles.playerWrapper}>
			{!isEmpty(props.movieStreamUrl) ? <Video
				source={{uri: props.movieStreamUrl.match(/^https?:/) ? props.movieStreamUrl : DUMMY_STREAM_URL}}
				style={styles.player}
			/> : <Text style={styles.playerText}>{"No source..."}</Text>}
		</View>
	</View>
	<BottomBarContainer component={BottomBar} />
</View>;

WatchLive.propTypes = {
	isAnimating: PropTypes.bool.isRequired,
	movieStreamUrl: PropTypes.string
};

export default WatchLive;
