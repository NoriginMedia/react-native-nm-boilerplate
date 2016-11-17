import React, {PropTypes} from "react";
import {connect} from "react-redux";

const DetailsProgram = (props) => {
	const {component: Component, ...rest} = props;

	return (
		<Component {...rest} />
	);
};

DetailsProgram.propTypes = {
	component: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(DetailsProgram);
