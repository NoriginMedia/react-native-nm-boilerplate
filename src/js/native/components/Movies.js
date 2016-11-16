import React, {PropTypes} from "react";
import {View, Text, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

const styles = StyleSheet.create({
	content: {
		flex: 1
	}
});

const Movies = (props) => <View style={styles.content}>
	<TopBar />
	<View style={styles.content}>
		<Text style={styles.content}>{"Movies"}</Text>
	</View>
	<BottomBar fullyAuthenticated={props.fullyAuthenticated} />
</View>;

Movies.propTypes = {
	fullyAuthenticated: PropTypes.bool.isRequired
};

export default Movies;
