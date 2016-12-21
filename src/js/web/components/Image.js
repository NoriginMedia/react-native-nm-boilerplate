import React, {PropTypes} from "react";

const RESIZE_CONTAIN = "contain";
const RESIZE_COVER = "cover";

const styles = {
	resizeCover: {
		minWidth: "100%",
		minHeight: "100%",
		objectFit: RESIZE_COVER
	},
	resizeContain: {
		width: "100%",
		height: "100%",
		objectFit: RESIZE_CONTAIN
	},
	backgroundImage: {
		position: "absolute"
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

		const resizeMode = this.props.children ?
			this.props.resizeMode || RESIZE_COVER :
			this.props.resizeMode || RESIZE_CONTAIN;
		const resizeStyle = (resizeMode === RESIZE_COVER && styles.resizeCover) || styles.resizeContain;

		return (<img
			style={this.props.children ? {
				...resizeStyle,
				...styles.backgroundImage
			} : resizeStyle}
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
	resizeMode: PropTypes.oneOf([RESIZE_COVER, RESIZE_CONTAIN]),
	style: PropTypes.object
};

export default CustomImage;
