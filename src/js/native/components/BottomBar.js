import React from "react";
import {View, Text, TouchableHighlight, StyleSheet} from "react-native";
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
	}
];

const BottomBar = () => <View style={styles.bottomBar}>
	{pages.map((page, index) => <Link
		activeOnlyWhenExact
		key={index}
		to={{
			pathname: page.path,
			state: {fromMenu: true}
		}}
	>{
		({transition, isActive}) => <TouchableHighlight
			onPress={transition}
			style={styles.bottomBarButton}
		>
			<Text style={isActive ? {fontWeight: "bold"} : {}}>{page.title}</Text>
		</TouchableHighlight>
	}</Link>)}
</View>;

export default BottomBar;
