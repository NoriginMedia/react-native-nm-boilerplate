import React, {PropTypes} from "react";
import {StyleSheet} from "react-native";
import {screenWidth, screenHeight} from "../utils/screen";
import Image from "./Image";

const styles = StyleSheet.create({
	image: {
		width: screenWidth * 0.45,
		height: screenHeight * 0.2
	}
});

const Movie = (props) => {
	const imageUrl = props.images.CarouselLandscapeSmall + "sddgdfgdf";

	return (<Image
		style={styles.image}
		resizeMode={"cover"}
		source={imageUrl}
	/>);
};

Movie.propTypes = {
	title: PropTypes.string.isRequired,
	images: PropTypes.shape({
		CarouselLandscapeSmall: PropTypes.string
	}).isRequired
};

export default Movie;
