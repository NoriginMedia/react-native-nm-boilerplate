import React, {PropTypes} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Link} from "react-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../../shared/styles/colors";

const styles = StyleSheet.create({
	bottomBar: {
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.primary
	},
	bottomBarButton: {
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
});

const renderLink = (path, icon) => <Link
	activeOnlyWhenExact
	key={icon}
	to={{
		pathname: path,
		state: {from: "menu"}
	}}
>{
	({transition, isActive}) => <TouchableOpacity
		onPress={transition}
		style={styles.bottomBarButton}
	>
		<Icon style={isActive ? styles.iconActive : styles.icon} name={icon} />
	</TouchableOpacity>
}</Link>;

const BottomBar = (props) => <View style={styles.bottomBar}>
	{renderLink("/", "home")}
	{renderLink("/tv", "tv")}
	{renderLink("/guide", "view-list")}
	{renderLink("/movies", "theaters")}
	{props.fullyAuthenticated ? <TouchableOpacity
		onPress={props.logout}
		style={styles.bottomBarButton}
	>
		<Icon name={"exit-to-app"} />
	</TouchableOpacity> : renderLink("/login", "account-box")}
</View>;

BottomBar.propTypes = {
	fullyAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
};

export default BottomBar;
