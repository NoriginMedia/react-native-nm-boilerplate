import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {login} from "../actions";

const Login = (props) => {
	const {component: Component, ...rest} = props;

	return (
		<Component {...rest} />
	);
};

Login.propTypes = {
	component: PropTypes.func.isRequired
};

const mapStateToProps = ({fullyAuthenticated}) => ({fullyAuthenticated});

export default connect(mapStateToProps, {
	login
})(Login);
