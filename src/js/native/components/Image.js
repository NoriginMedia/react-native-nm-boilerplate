import React, {PropTypes} from "react";
import {Image} from "react-native";

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

	render() {
		/* eslint-disable global-require */
		const defaultSource = require("../../../resources/images/placeholder_368p.jpg");

		const {source, ...rest} = this.props;

		return (<Image
			{...rest}
			source={(this.state.loadingFailed || !source) ? defaultSource : {uri: source}}
			defaultSource={defaultSource}
			onError={this.onLoadImageFailure}
		/>);
	}
}

CustomImage.propTypes = {
	source: PropTypes.string
};

export default CustomImage;
