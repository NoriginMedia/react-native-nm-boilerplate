import React, {PropTypes} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Link} from "react-router";
import {screenWidth, screenHeight} from "../utils/screen";
import Image from "./Image";

const styles = StyleSheet.create({
	image: {
		width: screenWidth * 0.25,
		height: screenHeight * 0.1,
		backgroundColor: "black"
	}
});

const LiveChannel = (props) => {
	const imageUrl = props.images.LOGO;

	return (<Link
		to={{
			pathname: "/tv",
			state: {from: "home"},
			query: {channelId: props.id}
		}}
	>{
		({transition}) => <TouchableOpacity
			onPress={transition}
		>
			<Image
				style={styles.image}
				resizeMode={"cover"}
				source={imageUrl}
			/>
		</TouchableOpacity>
	}</Link>);
};

LiveChannel.propTypes = {
	title: PropTypes.string.isRequired,
	images: PropTypes.shape({
		LOGO: PropTypes.string
	}).isRequired,
	id: PropTypes.string.isRequired
};

export default LiveChannel;
