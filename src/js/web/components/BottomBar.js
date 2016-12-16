import React, {PropTypes} from "react";
import {Link} from "react-router";
import Icon from "./Icon";
import colors from "../../shared/styles/colors";
import {horizontalFlex, verticalFlex} from "../styles/layout";

const styles = {
	bottomBar: {
		...horizontalFlex,
		height: 50,
		alignItems: "center",
		backgroundColor: colors.primary
	},
	bottomBarButton: {
		...verticalFlex,
		alignItems: "center",
		justifyContent: "center",
		flex: 1
	},
	icon: {
		fontSize: 30,
		color: "white"
	},
	iconActive: {
		fontSize: 30,
		color: colors.accent
	}
};

const renderLink = (path, icon) => <Link
	activeOnlyWhenExact
	key={icon}
	to={{
		pathname: path,
		state: {from: "menu"}
	}}
>{
	({transition, isActive}) => <div
		onClick={transition}
		style={styles.bottomBarButton}
	>
		<Icon style={isActive ? styles.iconActive : styles.icon} name={icon} />
	</div>
}</Link>;

const BottomBar = (props) => <div style={styles.bottomBar}>
	{renderLink("/", "home")}
	{renderLink("/tv", "tv")}
	{renderLink("/guide", "view-list")}
	{renderLink("/movies", "theaters")}
	{props.fullyAuthenticated ? <div
		onClick={props.logout}
		style={styles.bottomBarButton}
	>
		<Icon style={styles.icon} name={"exit-to-app"} />
	</div> : renderLink("/login", "account-box")}
</div>;

BottomBar.propTypes = {
	fullyAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
};

export default BottomBar;
