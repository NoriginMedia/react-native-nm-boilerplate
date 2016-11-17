import React, {PropTypes} from "react";
import {connect} from "react-redux";

const WatchLive = (props) => {
	const {component: Component, ...rest} = props;

	return (
		<Component {...rest} />
	);
};

WatchLive.propTypes = {
	component: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(WatchLive);
