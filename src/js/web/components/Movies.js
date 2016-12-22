import React, {PropTypes} from "react";
import {isEmpty} from "lodash";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import BottomBarContainer from "../../shared/containers/BottomBar";
import colors from "../../shared/styles/colors";
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
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around"
	},
	playerText: {
		color: "white"
	},
	player: {
		height: 600,
		width: 800
	}
};

const WatchLive = (props) => <div style={styles.content}>
	<TopBar />
	<div style={styles.content}>
		<div style={styles.playerWrapper}>
			{!isEmpty(props.movieStreamUrl) ? <video
				src={props.movieStreamUrl.match(/^https?:/) ? props.movieStreamUrl : DUMMY_STREAM_URL}
				style={styles.player}
			/> : <div style={styles.playerText}>{"No source..."}</div>}
		</div>
	</div>
	<BottomBarContainer component={BottomBar} />
</div>;

WatchLive.propTypes = {
	movieStreamUrl: PropTypes.string
};

export default WatchLive;
