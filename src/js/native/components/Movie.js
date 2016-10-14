import React, {PropTypes} from "react";
import {Image, StyleSheet} from "react-native";
import {screenWidth, screenHeight} from "../utils/screen";

const styles = StyleSheet.create({
	image: {
		width: screenWidth * 0.45,
		height: screenHeight * 0.2
	}
});

const Movie = (props) => {
	const imageUrl = props.images.CarouselLandscapeSmall;

	return (<Image
		style={styles.image}
		resizeMode={"cover"}
		source={{uri: imageUrl}}
	/>);
};

Movie.propTypes = {
	title: PropTypes.string.isRequired,
	images: PropTypes.shape({
		CarouselLandscapeSmall: PropTypes.string.isRequired
	}).isRequired
};

export default Movie;
