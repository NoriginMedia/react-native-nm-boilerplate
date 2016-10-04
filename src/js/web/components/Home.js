import React, {PropTypes} from "react";

const Home = (props) => <div>
	<span>{props.test}</span>
</div>;

Home.propTypes = {
	test: PropTypes.string
};

export default Home;
