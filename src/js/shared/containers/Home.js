import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import ChildWithProps from "../ChildWithProps";
import {testAction} from "../actions";

class Home extends Component {
	componentDidMount() {
		this.props.testAction();
	}

	render() {
		return (
			<ChildWithProps {...this.props} />
		);
	}
}

Home.propTypes = {
	testAction: PropTypes.func.isRequired
};

const mapStateToProps = ({test}) => ({test});

export default connect(mapStateToProps, {
	testAction
})(Home);
