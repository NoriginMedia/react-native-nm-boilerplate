import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {fetchProgramDetails} from "../actions";

class DetailsProgram extends React.Component {
	componentDidMount() {
		const {channelId, programId} = this.props.location.query;

		this.props.fetchProgramDetails(channelId, programId);
	}

	render() {
		const {component: Component, ...rest} = this.props;

		return (
			<Component {...rest} />
		);
	}
}

DetailsProgram.propTypes = {
	component: PropTypes.func.isRequired,
	location: PropTypes.shape({
		query: PropTypes.shape({
			channelId: PropTypes.string,
			programId: PropTypes.string
		})
	}).isRequired,
	fetchProgramDetails: PropTypes.func.isRequired,
	program: PropTypes.object.isRequired
};

const mapStateToProps = ({programs}, ownProps) => {
	const programId = ownProps.location.query && ownProps.location.query.programId;

	return {
		program: programId ? programs[programId] || {} : {}
	};
};

export default connect(mapStateToProps, {
	fetchProgramDetails
})(DetailsProgram);
