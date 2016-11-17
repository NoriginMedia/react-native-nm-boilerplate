import React, {PropTypes} from "react";
import {StyleSheet, View, Text} from "react-native";
import {screenWidth, screenHeight} from "../utils/screen";
import Image from "./Image";

const styles = StyleSheet.create({
	content: {
		flex: 1
	},
	image: {
		width: screenWidth * 0.45,
		height: screenHeight * 0.2
	},
	title: {
		maxWidth: screenWidth * 0.45,
		fontWeight: "bold"
	}
});

const Movie = (props) => {
	const imageUrl = props.images.CarouselLandscapeSmall;
	const duration = props.metadata && props.metadata.duration;

	return (<View style={styles.content}>
		<Image
			style={styles.image}
			resizeMode={"cover"}
			source={imageUrl}
		/>
		<Text style={styles.title}>{props.title}</Text>
		<Text>{duration}</Text>
	</View>);
};

Movie.propTypes = {
	title: PropTypes.string.isRequired,
	images: PropTypes.shape({
		CarouselLandscapeSmall: PropTypes.string
	}).isRequired,
	metadata: PropTypes.shape({
		duration: PropTypes.number
	})
};

export default Movie;
