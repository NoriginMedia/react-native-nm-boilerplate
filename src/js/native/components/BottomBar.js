import React, {PropTypes} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Link} from "react-router";

const styles = StyleSheet.create({
	bottomBar: {
		height: 50,
		flexDirection: "row",
		alignItems: "center"
	},
	bottomBarButton: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1
	}
});

const renderLink = (path, title) => <Link
	activeOnlyWhenExact
	key={title}
	to={{
		pathname: path,
		state: {from: "menu"}
	}}
>{
	({transition, isActive}) => <TouchableOpacity
		onPress={transition}
		style={styles.bottomBarButton}
	>
		<Text style={isActive ? {fontWeight: "bold"} : {}}>{title}</Text>
	</TouchableOpacity>
}</Link>;

const BottomBar = (props) => <View style={styles.bottomBar}>
	{renderLink("/", "Home")}
	{renderLink("/tv", "TV")}
	{renderLink("/guide", "EPG")}
	{renderLink("/movies", "VOD")}
	{props.fullyAuthenticated ? <TouchableOpacity
		onPress={props.logout}
		style={styles.bottomBarButton}
	>
		<Text>{"Logout"}</Text>
	</TouchableOpacity> : renderLink("/login", "Login")}
</View>;

BottomBar.propTypes = {
	fullyAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
};

export default BottomBar;
