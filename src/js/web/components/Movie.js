import React, {PropTypes} from "react";
import {Link} from "react-router";
import Image from "./Image";
import {secondsToMinuteString} from "../../shared/utils/time";

const styles = {
	content: {
		width: 150,
		maxHeight: 150,
		paddingLeft: 5,
		paddingRight: 5
	},
	image: {
		width: 140,
		height: 90
	},
	title: {
		color: "white",
		fontWeight: "bold",
		fontSize: 12
	},
	duration: {
		color: "white",
		fontSize: 10
	}
};

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
				({transition}) => <div onClick={transition}>
					{image}
				</div>
			}</Link>);
		}

		return (<div onClick={this.onImagePress}>
			{image}
		</div>);
	}

	renderDescription() {
		const duration = this.props.metadata && this.props.metadata.duration;

		return (<div>
			<div style={styles.title}>
				{this.props.title}
			</div>
			<div style={styles.duration}>{`${secondsToMinuteString(duration || 0)} min`}</div>
		</div>);
	}

	render() {
		return (<div
			style={{
				...styles.content,
				...this.props.style
			}}
		>
			{this.renderImage()}
			{this.renderDescription()}
		</div>);
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
	onPress: () => {},
	style: {}
};

export default Movie;
