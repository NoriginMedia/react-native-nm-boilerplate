import React, {PropTypes} from "react";
import {connect} from "react-redux";

const Login = (props) => {
	const {component: Component, ...rest} = props;

	return (
		<Component {...rest} />
	);
};

Login.propTypes = {
	component: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(Login);
