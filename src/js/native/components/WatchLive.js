import React, {PropTypes} from "react";
import {ScrollView, View, Text, StyleSheet} from "react-native";
/* eslint-disable */
import Video from "react-native-video";
/* eslint-enable */
import {isEmpty} from "lodash";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";

// import {staticBackground} from "../styles/animations";

import colors from "../../shared/styles/colors";
import Category from "./Category";
import LiveChannel from "./LiveChannel";
import {screenWidth} from "../utils/screen";
import {DUMMY_STREAM_URL} from "../../shared/config";

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: colors.background
	},
	playerWrapper: {
		height: 300,
		alignItems: "center",
		justifyContent: "space-around"
	},
	playerText: {
		color: "white"
	},
	player: {
		height: 300,
		width: screenWidth
	},
	channelsWrapper: {
		maxHeight: 150
	}
});

const WatchLive = (props) => <View style={styles.content}>
	<TopBar />
	<ScrollView style={styles.content}>
		<View style={styles.playerWrapper}>
			{!isEmpty(props.channelStreamUrl) ? <Video
				source={{uri: props.channelStreamUrl.match(/^https?:/) ? props.channelStreamUrl : DUMMY_STREAM_URL}}
				style={styles.player}
			/> : <Text style={styles.playerText}>{"Loading..."}</Text>}
		</View>
		<View style={styles.channelsWrapper}>
			<Category
				itemComponent={LiveChannel}
				items={props.channels}
				onItemPress={props.onChannelSelect}
				horizontalScroll
				selectedItem={props.selectedChannel || ""}
			/>
		</View>
	</ScrollView>
	<BottomBarContainer component={BottomBar} />
</View>;

WatchLive.propTypes = {
	channelStreamUrl: PropTypes.string,
	onChannelSelect: PropTypes.func.isRequired,
	channels: PropTypes.array.isRequired,
	selectedChannel: PropTypes.string
};

export default WatchLive;
