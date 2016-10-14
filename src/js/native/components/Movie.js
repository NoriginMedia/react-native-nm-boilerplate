import React, {PropTypes} from "react";
import {View, Text} from "react-native";

const Movie = (props) => <View>
	<Text>{props.title}</Text>
</View>;

Movie.propTypes = {
	title: PropTypes.string.isRequired
};

export default Movie;
