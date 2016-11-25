import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {
	fetchChannels
} from "../actions";

class ProgramGuide extends React.Component {
	componentDidMount() {
		this.props.fetchChannels();
	}

	render() {
		const {component: Component, ...rest} = this.props;

		return (
			<Component {...rest} />
		);
	}
}

ProgramGuide.propTypes = {
	component: PropTypes.func.isRequired,
	fetchChannels: PropTypes.func,
	channels: PropTypes.array
};

const mapStateToProps = ({channels}) => ({channels});

export default connect(mapStateToProps, {
	fetchChannels
})(ProgramGuide);
