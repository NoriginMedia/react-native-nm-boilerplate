import React, {PropTypes} from "react";
import {Image, StyleSheet} from "react-native";
import {screenWidth, screenHeight} from "../utils/screen";

const styles = StyleSheet.create({
	image: {
		width: screenWidth,
		height: screenHeight * 0.35
	}
});

const SlideshowItem = (props) => {
	const imageUrl = props.images.CarouselLandscapeHeader;

	return (<Image
		style={styles.image}
		resizeMode={"cover"}
		source={{uri: imageUrl}}
	/>);
};

SlideshowItem.propTypes = {
	title: PropTypes.string.isRequired,
	images: PropTypes.shape({
		CarouselLandscapeHeader: PropTypes.string.isRequired
	}).isRequired
};

export default SlideshowItem;
