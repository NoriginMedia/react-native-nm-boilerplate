import React, {PropTypes} from "react";

const styles = {
	resizeCover: {
		minWidth: "100%",
		minHeight: "100%",
		objectFit: "cover"
	},
	resizeContain: {
		maxWidth: "100%",
		maxHeight: "100%",
		objectFit: "contain"
	},
	backgroundImage: {
		position: "absolute",
		zIndex: -1
	}
};

class CustomImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingFailed: false
		};

		this.onLoadImageFailure = this.onLoadImageFailure.bind(this);
	}

	onLoadImageFailure() {
		this.setState({loadingFailed: true});
	}

	renderImage() {
		/* eslint-disable global-require */
		const defaultSource = require("../../../resources/images/placeholder_368p.jpg");

		return (<img
			style={this.props.children ? {
				...styles.resizeCover,
				...styles.backgroundImage
			} : styles.resizeContain}
			src={(this.state.loadingFailed || !this.props.source) ? defaultSource : this.props.source}
			onError={this.onLoadImageFailure}
			alt={"Not available"}
		/>);
	}

	render() {
		return (<div style={this.props.style || {}}>
			{this.renderImage()}
			{this.props.children}
		</div>);
	}
}

CustomImage.propTypes = {
	source: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	resizeMode: PropTypes.oneOf(["cover", "contain"]),
	style: PropTypes.object
};

export default CustomImage;
