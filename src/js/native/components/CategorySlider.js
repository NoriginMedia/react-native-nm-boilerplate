import React, {PropTypes} from "react";
import {View, StyleSheet, ScrollView, Text} from "react-native";

const styles = StyleSheet.create({
	container: {

	},
	header: {
		height: 20
	}
});

const CategorySlider = (props) => {
	const Item = props.itemComponent;

	return (<View style={styles.container}>
		<View style={styles.header}>
			<Text>
				{props.title}
			</Text>
		</View>
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{props.items.map((item, index) => <Item key={index} {...item} />)}
		</ScrollView>
	</View>);
};

CategorySlider.propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
	itemComponent: PropTypes.func.isRequired
};

export default CategorySlider;
