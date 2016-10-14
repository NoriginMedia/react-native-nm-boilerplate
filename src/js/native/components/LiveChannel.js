import React, {PropTypes} from "react";
import {Image, StyleSheet} from "react-native";
import {screenWidth, screenHeight} from "../utils/screen";

const styles = StyleSheet.create({
	image: {
		width: screenWidth * 0.25,
		height: screenHeight * 0.1,
		backgroundColor: "black"
	}
});

const LiveChannel = (props) => {
	const imageUrl = props.images.LOGO;

	return (imageUrl ? <Image
		style={styles.image}
		resizeMode={"cover"}
		source={{uri: imageUrl}}
	/> : null);
};

LiveChannel.propTypes = {
	title: PropTypes.string.isRequired,
	images: PropTypes.shape({
		LOGO: PropTypes.string
	}).isRequired
};

export default LiveChannel;
