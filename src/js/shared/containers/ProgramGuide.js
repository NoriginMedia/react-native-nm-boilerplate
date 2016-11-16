import React, {PropTypes} from "react";
import {connect} from "react-redux";

const ProgramGuide = (props) => {
	const {component: Component, ...rest} = props;

	return (
		<Component {...rest} />
	);
};

ProgramGuide.propTypes = {
	component: PropTypes.func.isRequired
};

const mapStateToProps = ({fullyAuthenticated}) => ({fullyAuthenticated});

export default connect(mapStateToProps, {})(ProgramGuide);
