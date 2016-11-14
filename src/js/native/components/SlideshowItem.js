import React, {PropTypes} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Link} from "react-router";
import {screenWidth, screenHeight} from "../utils/screen";
import Image from "./Image";

const styles = StyleSheet.create({
	image: {
		width: screenWidth,
		height: screenHeight * 0.35
	},
	overlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: screenWidth,
		height: 50,
		backgroundColor: "gray",
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row"
	},
	title: {
		color: "white"
	}
});

const SlideshowItem = (props) => {
	const imageUrl = props.images.CarouselLandscapeHeader;

	return (
		<Image
			style={styles.image}
			resizeMode={"cover"}
			source={imageUrl}
		>
			<View style={styles.overlay}>
				<Text style={styles.title}>{props.title}</Text>
				<Link
					to={{
						pathname: "/details/program",
						state: {from: "home"},
						query: {
							programInfoUri: props.uri
						}
					}}
				>{
					({transition}) => <TouchableOpacity
						onPress={transition}
					>
						<Text>{"Info"}</Text>
					</TouchableOpacity>
				}</Link>
			</View>
		</Image>
	);
};

SlideshowItem.propTypes = {
	title: PropTypes.string.isRequired,
	images: PropTypes.shape({
		CarouselLandscapeHeader: PropTypes.string
	}).isRequired,
	uri: PropTypes.string.isRequired
};

export default SlideshowItem;
