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

const pages = [
	{
		path: "/",
		title: "Home"
	},
	{
		path: "/tv",
		title: "TV"
	},
	{
		path: "/guide",
		title: "EPG"
	},
	{
		path: "/movies",
		title: "VOD"
	},
	{
		path: "/login",
		title: "Login",
		hideWhenAuthenticated: true
	}
];

const BottomBar = (props) => <View style={styles.bottomBar}>
	{pages.map((page, index) => {
		if (page.hideWhenAuthenticated && props.fullyAuthenticated) {
			return null;
		}

		return (<Link
			activeOnlyWhenExact
			key={index}
			to={{
				pathname: page.path,
				state: {from: "menu"}
			}}
		>{
			({transition, isActive}) => <TouchableOpacity
				onPress={transition}
				style={styles.bottomBarButton}
			>
				<Text style={isActive ? {fontWeight: "bold"} : {}}>{page.title}</Text>
			</TouchableOpacity>
		}</Link>);
	})}
</View>;

BottomBar.propTypes = {
	fullyAuthenticated: PropTypes.bool
};

export default BottomBar;
