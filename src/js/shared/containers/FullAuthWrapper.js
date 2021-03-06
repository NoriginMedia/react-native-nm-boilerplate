import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";

const FullAuthWrapper = (props) => {
	const {
		fullyAuthenticated,
		container: Container,
		component: Component,
		...rest} = props;

	return fullyAuthenticated ? (<Container component={Component} {...rest} />) : (<Redirect
		to={{
			pathname: "/login",
			state: {
				referrer: props.location
			}
		}}
	/>);
};

FullAuthWrapper.propTypes = {
	fullyAuthenticated: PropTypes.bool.isRequired,
	container: PropTypes.func.isRequired,
	component: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired
};

const mapStateToProps = ({fullyAuthenticated}) => ({fullyAuthenticated});

export default connect(mapStateToProps, {})(FullAuthWrapper);
