import React, {PropTypes} from "react";
import {connect} from "react-redux";

const Home = (props) => {
	const {component: Component, ...rest} = props;

	return (
		<Component {...rest} />
	);
};

Home.propTypes = {
	component: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(Home);
