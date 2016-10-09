import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

class AuthWrapper extends Component {
	render() {
		const {authenticatedAnonymously, component: View, ...rest} = this.props;

		return authenticatedAnonymously ? (<View {...rest} />) : null;
	}
}

AuthWrapper.propTypes = {
	authenticatedAnonymously: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired
};

const mapStateToProps = ({authenticatedAnonymously}) => ({authenticatedAnonymously});

export default connect(mapStateToProps, {})(AuthWrapper);
