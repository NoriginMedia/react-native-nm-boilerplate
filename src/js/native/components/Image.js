import React, {PropTypes} from "react";
import {Image} from "react-native";
import {isString, isEmpty} from "lodash";

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
		const fullSource = isString(source) && !isEmpty(source) ? {uri: source} : source;

		return (<Image
			{...rest}
			source={(this.state.loadingFailed || !fullSource) ? defaultSource : fullSource}
			defaultSource={defaultSource}
			onError={this.onLoadImageFailure}
		/>);
	}
}

CustomImage.propTypes = {
	source: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

export default CustomImage;
