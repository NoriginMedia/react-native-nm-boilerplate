import React, {PropTypes} from "react";
import {connect} from "react-redux";

const Movies = (props) => {
	const {component: Component, ...rest} = props;

	return (
		<Component {...rest} />
	);
};

Movies.propTypes = {
	component: PropTypes.func.isRequired
};

const mapStateToProps = ({fullyAuthenticated}) => ({fullyAuthenticated});

export default connect(mapStateToProps, {})(Movies);
