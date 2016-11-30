import React, {PropTypes} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Link} from "react-router";
import Image from "./Image";

const styles = StyleSheet.create({
	content: {
		flex: 1
	},
	image: {
		width: 140,
		height: 120
	},
	title: {
		maxWidth: 140,
		fontWeight: "bold",
		color: "white"
	},
	duration: {
		color: "white"
	}
});

class Movie extends React.Component {
	constructor(props) {
		super(props);

		this.onImagePress = this.onImagePress.bind(this);
	}

	onImagePress() {
		this.props.onPress(this.props.id, this.props.type);
	}

	renderImage() {
		const imageUrl = this.props.images.CarouselLandscapeSmall;
		const image = (<Image
			style={styles.image}
			resizeMode={"cover"}
			source={imageUrl}
		/>);

		if (this.props.isLink) {
			return (<Link
				to={{
					pathname: "/details/movie",
					state: {from: this.props.linkReferer || "/"},
					query: {
						movieId: this.props.id,
						movieType: this.props.type
					}
				}}
			>{
				({transition}) => <TouchableOpacity
					onPress={transition}
				>
					{image}
				</TouchableOpacity>
			}</Link>);
		}

		return (<TouchableOpacity
			onPress={this.onImagePress}
		>
			{image}
		</TouchableOpacity>);
	}

	renderDescription() {
		const duration = this.props.metadata && this.props.metadata.duration;

		return (<View>
			<Text style={styles.title}>{this.props.title}</Text>
			<Text style={styles.duration}>{duration}</Text>
		</View>);
	}

	render() {
		return (<View style={[styles.content, this.props.style || {}]}>
			{this.renderImage()}
			{this.renderDescription()}
		</View>);
	}
}

Movie.propTypes = {
	title: PropTypes.string.isRequired,
	images: PropTypes.shape({
		CarouselLandscapeSmall: PropTypes.string
	}).isRequired,
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	metadata: PropTypes.shape({
		duration: PropTypes.number
	}),
	isLink: PropTypes.bool,
	linkReferer: PropTypes.string,

	/* invoked only if item is not a Link */
	onPress: PropTypes.func.isRequired,
	style: PropTypes.object
};

/* eslint-disable no-empty-function */
Movie.defaultProps = {
	onPress: () => {}
};

export default Movie;
