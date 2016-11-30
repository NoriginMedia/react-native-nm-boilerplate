import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {fetchMovieStream} from "../actions";

class Movies extends React.Component {
	componentDidMount() {
		const {movieId, movieType} = this.props.location.query || {};

		if (movieId && movieType) {
			this.props.fetchMovieStream(movieId, movieType);
		}
	}

	render() {
		const {component: Component, ...rest} = this.props;

		return (
			<Component
				{...rest}
			/>
		);
	}
}

Movies.propTypes = {
	component: PropTypes.func.isRequired,
	movieStreamUrl: PropTypes.string,
	fetchMovieStream: PropTypes.func.isRequired,
	location: PropTypes.shape({
		query: PropTypes.shape({
			movieId: PropTypes.string,
			movieType: PropTypes.string
		})
	}).isRequired
};

const mapStateToProps = ({movieStreamUrl}) => ({
	movieStreamUrl
});

export default connect(mapStateToProps, {
	fetchMovieStream
})(Movies);
