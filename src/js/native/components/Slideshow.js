import React, {PropTypes} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

const Slideshow = (props) => <View style={styles.container}>
	<ScrollView horizontal pagingEnabled >
		{props.items.map((item, index) => <View key={index}>
			<Text>{item.title}</Text>
		</View>)}
	</ScrollView>
</View>;

Slideshow.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired
	})).isRequired
};

export default Slideshow;
