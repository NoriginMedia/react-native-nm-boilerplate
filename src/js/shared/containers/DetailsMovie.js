import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {fetchMovieDetails} from "../actions";

class DetailsMovie extends React.Component {
	componentDidMount() {
		const {movieId, movieType} = this.props.location.query;

		this.props.fetchMovieDetails(movieId, movieType);
	}

	render() {
		const {component: Component, ...rest} = this.props;

		return (
			<Component {...rest} />
		);
	}
}

DetailsMovie.propTypes = {
	component: PropTypes.func.isRequired,
	location: PropTypes.shape({
		query: PropTypes.shape({
			movieId: PropTypes.string,
			movieType: PropTypes.string
		})
	}).isRequired,
	fetchMovieDetails: PropTypes.func.isRequired,
	movie: PropTypes.object.isRequired
};

const mapStateToProps = ({movies}, ownProps) => {
	const movieType = ownProps.location.query && ownProps.location.query.movieType;
	const moviesByType = movies[movieType] || {};
	const movieId = ownProps.location.query && ownProps.location.query.movieId;

	return {
		movie: movieId ? moviesByType[movieId] || {} : {}
	};
};

export default connect(mapStateToProps, {
	fetchMovieDetails
})(DetailsMovie);
