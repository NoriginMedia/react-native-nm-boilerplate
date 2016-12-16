import React, {PropTypes} from "react";
import {Link} from "react-router";
import colors from "../../shared/styles/colors";
import {horizontalFlex} from "../styles/layout";
import Image from "./Image";
import Icon from "./Icon";

const styles = {
	topBar: {
		...horizontalFlex,
		backgroundColor: colors.primary,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		alignItems: "center",
		justifyContent: "space-between"
	},
	topBarTitle: {
		...horizontalFlex,
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	topBarButton: {
		flex: 1
	},
	topBarLogo: {
		height: 50,
		width: 50
	},
	topBarLeftButtonText: {
		textAlign: "left",
		color: colors.accent,
		fontSize: 30
	}
};

/* eslint-disable global-require */
const logoSrc = require("../../../resources/images/logo.png");

const TopBar = (props) => <div style={styles.topBar}>
	<div style={styles.topBarButton}>
		{(props.leftButtonPath || props.leftButtonReferer) ? <Link
			to={{
				pathname: props.leftButtonPath || "/",
				state: {from: props.leftButtonReferer}
			}}
		>{
			({transition}) => <div
				onClick={transition}
			>
				<Icon
					style={styles.topBarLeftButtonText}
					name={"keyboard-arrow-left"}
				/>
			</div>
		}</Link> : null}
	</div>
	<div style={styles.topBarTitle}>
		<Link
			to={{
				pathname: "/",
				state: {from: "menu"}
			}}
		>{
			({transition}) => <Image
				style={styles.topBarLogo}
				onClick={transition}
				source={logoSrc}
			/>
		}</Link>
	</div>
	<div style={styles.topBarButton}>
		{null}
	</div>
</div>;

TopBar.propTypes = {
	leftButtonPath: PropTypes.string,
	leftButtonReferer: PropTypes.string
};

export default TopBar;
