import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {testAction} from "../actions";

class Home extends Component {
	componentDidMount() {
		this.props.testAction();
	}

	render() {
		const {component: View, ...rest} = this.props;

		return (
			<View {...rest} />
		);
	}
}

Home.propTypes = {
	testAction: PropTypes.func.isRequired,
	component: PropTypes.func.isRequired
};

const mapStateToProps = ({test}) => ({test});

export default connect(mapStateToProps, {
	testAction
})(Home);
