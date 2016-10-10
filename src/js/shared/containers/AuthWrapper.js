import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {authAnonymously} from "../actions";

class AuthWrapper extends React.Component {
	componentWillMount() {
		this.props.authAnonymously();
	}

	render() {
		const {
			authenticatedAnonymously,
			component: Component,
			loader: Loader,
			...rest
		} = this.props;

		return authenticatedAnonymously ? (<Component {...rest} />) : (<Loader {...rest} />);
	}
}

AuthWrapper.propTypes = {
	authenticatedAnonymously: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
	loader: PropTypes.func.isRequired,
	authAnonymously: PropTypes.func.isRequired
};

const mapStateToProps = ({authenticatedAnonymously}) => ({authenticatedAnonymously});

export default connect(mapStateToProps, {
	authAnonymously
})(AuthWrapper);
