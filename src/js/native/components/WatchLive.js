import React, {PropTypes} from "react";
import {View, Text, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";
import {staticBackground} from "../styles/animations";
import colors from "../../shared/styles/colors";
import Category from "./Category";
import LiveChannel from "./LiveChannel";

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
	player: {
		color: "white"
	},
	channelsWrapper: {
		flex: 1
	}
});

const WatchLive = (props) => <View style={props.isAnimating ? staticBackground : {flex: 1}}>
	<TopBar />
	<View style={styles.content}>
		<View style={styles.playerWrapper}>
			<Text style={styles.player}>{"Player"}</Text>
		</View>
		<View style={styles.channelsWrapper}>
			<Category
				itemComponent={LiveChannel}
				items={props.channels}
				onItemPress={props.onChannelSelect}
			/>
		</View>
	</View>
	<BottomBarContainer component={BottomBar} />
</View>;

WatchLive.propTypes = {
	isAnimating: PropTypes.bool.isRequired,
	channelStreamUrl: PropTypes.string,
	onChannelSelect: PropTypes.func.isRequired,
	channels: PropTypes.array.isRequired
};

export default WatchLive;
