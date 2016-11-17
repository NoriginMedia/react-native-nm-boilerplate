import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {logout} from "../actions";

const BottomBar = (props) => {
	const {component: Component, ...rest} = props;

	return (
		<Component {...rest} />
	);
};

BottomBar.propTypes = {
	component: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	fullyAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({fullyAuthenticated}) => ({fullyAuthenticated});

export default connect(mapStateToProps, {logout})(BottomBar);
