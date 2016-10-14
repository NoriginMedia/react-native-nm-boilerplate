import React, {PropTypes} from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import SlideshowItem from "./SlideshowItem";

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

const Slideshow = (props) => <View style={styles.container}>
	<ScrollView horizontal showsHorizontalScrollIndicator={false} >
		{props.items.map((item, index) => <SlideshowItem key={index} {...item} />)}
	</ScrollView>
</View>;

Slideshow.propTypes = {
	items: PropTypes.array.isRequired
};

export default Slideshow;
