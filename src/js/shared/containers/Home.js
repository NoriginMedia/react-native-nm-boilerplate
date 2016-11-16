import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {
	fetchSlides,
	fetchChannels,
	fetchCategories
} from "../actions";

class Home extends React.Component {
	componentDidMount() {
		this.props.fetchSlides();
		this.props.fetchChannels();
		this.props.fetchCategories();
	}

	render() {
		const {component: Component, ...rest} = this.props;

		return (
			<Component {...rest} />
		);
	}
}

Home.propTypes = {
	component: PropTypes.func.isRequired,
	fetchSlides: PropTypes.func,
	fetchChannels: PropTypes.func,
	fetchCategories: PropTypes.func,
	slides: PropTypes.array,
	channels: PropTypes.array,
	categories: PropTypes.array
};

const mapStateToProps = ({slides, channels, categories, fullyAuthenticated}) => ({
	slides,
	channels,
	categories,
	fullyAuthenticated
});

export default connect(mapStateToProps, {
	fetchSlides,
	fetchChannels,
	fetchCategories
})(Home);
