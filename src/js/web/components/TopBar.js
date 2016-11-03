import React from "react";
import colors from "../../shared/styles/colors";

const styles = {
	topBar: {
		backgroundColor: colors.darkBlue,
		flexDirection: "row"
	},
	topBarText: {
		color: "white",
		flex: 1,
		textAlign: "center"
	}
};

const TopBar = () => <div style={styles.topBar}>
	<div style={styles.topBarText}>{"top bar"}</div>
</div>;

export default TopBar;
