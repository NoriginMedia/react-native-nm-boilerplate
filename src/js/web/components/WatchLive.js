import React, {PropTypes} from "react";
import {isEmpty} from "lodash";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";
import colors from "../../shared/styles/colors";
import Category from "./Category";
import LiveChannel from "./LiveChannel";
import {DUMMY_STREAM_URL} from "../../shared/config";
import {verticalFlex} from "../styles/layout";

const styles = {
	content: {
		...verticalFlex,
		flex: 1,
		backgroundColor: colors.background
	},
	playerWrapper: {
		...verticalFlex,
		height: 600,
		alignItems: "center",
		justifyContent: "space-around"
	},
	playerText: {
		color: "white"
	},
	player: {
		height: 600,
		width: 800
	},
	channelsWrapper: {
		maxHeight: 150
	}
};

const WatchLive = (props) => <div style={styles.content}>
	<TopBar />
	<div style={styles.content}>
		<div style={styles.playerWrapper}>
			{!isEmpty(props.channelStreamUrl) ? <video
				src={props.channelStreamUrl.match(/^https?:/) ? props.channelStreamUrl : DUMMY_STREAM_URL}
				style={styles.player}
			/> : <div style={styles.playerText}>{"Loading..."}</div>}
		</div>
		<div style={styles.channelsWrapper}>
			<Category
				itemComponent={LiveChannel}
				items={props.channels}
				onItemPress={props.onChannelSelect}
				horizontalScroll
				selectedItem={props.selectedChannel || ""}
			/>
		</div>
	</div>
	<BottomBarContainer component={BottomBar} />
</div>;

WatchLive.propTypes = {
	channelStreamUrl: PropTypes.string,
	onChannelSelect: PropTypes.func.isRequired,
	channels: PropTypes.array.isRequired,
	selectedChannel: PropTypes.string
};

export default WatchLive;
